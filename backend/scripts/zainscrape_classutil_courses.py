import urllib2
import re
import json
import threading
import time
import datetime


class WebScrapeWorker(threading.Thread):
   def __init__(self, threadID, name, payload, stream):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.results = []
      self.payload = payload
      self.stream = stream;
   def run(self):
   		self.results += self.stream.processPayload(self.payload)

class DataStream():
	def __init__(self, params):
		self.debug = False
		self.params = params
		self.numThreads = 10
		self.resultCols = ["Course Name","Capacity","Gen Ed","Grad Level","Handbook Link"]
	# debugging functions
	def debugPrint(self,s, **kargs):
		if self.debug:
			if "indent" in kargs:
				s = " "*kargs["indent"]+s
			print(s)
	def debugPrintList(self,l, **kargs):
		if self.debug:
			for e in l:
				if "indent" in kargs:
					s = " "*kargs["indent"]+str(e)
				else:
					s = str(e)
				print(s)
	# helper functions
	def getPage(self,link):
		r = urllib2.urlopen(link)
		page = r.read()
		r.close()
		return page
	def getClassTimetableUrl(self):
		y = str(self.params['year'])
		return "http://timetable.unsw.edu.au/"+y+"/"
	def getCoursePage(self,course):
		base = self.getClassTimetableUrl()
		page = self.getPage(base+course+".html")
		sem = self.params['sem']
		if(sem == "1"):
			semId = "#S1"
		elif(sem == "2"):
			semId = "#S2"
		else:
			semId = "#X1"
		newPage = []
		care = False
		closeTableCount = 0
		for line in page.split('\n'):
			if re.search("href=\""+semId+"\"", line) != None:
				care = True
			if re.search(r"</table>", line) != None and care == True:
				closeTableCount+=1
			if closeTableCount == 3:
				care = False
			if care:
				newPage.append(line)
		if(len(newPage) == 0):
			return None
		return (page,"\n".join(newPage))
	def getCourseStatus(self,page):
		lectureUsages = re.findall(r'Lecture([^<>]*</a>[^<>]*</td>[^<>]*<td[^<>]*>((<a[^<>]*>)|(<font[^<>]*>)))+([^<>]+)<', str(page))
		lectureUsages = list(map(lambda x: x[-1], lectureUsages))
		status = "Lectures Open"
		if len(lectureUsages) == 0:
			status = "No Lectures Found"
		elif lectureUsages.count("Full") == len(lectureUsages):
			status = "Lectures Full"
		elif lectureUsages.count("Full") + lectureUsages.count("On Hold") == len(lectureUsages):
			status = "Lectures Full w/ hold"
		return status
	def getHandbookLink(self,rawPage):
		link = re.search(r'\"([^\"]+)\">Online Handbook record', str(rawPage)).group(1)
		return link
	def isGeneralCourse(self,rawPage):
		link = self.getHandbookLink(rawPage)
		try:
			page = self.getPage(link)
			gen = re.search(r"<strong>Available for General Education:</strong>([^<>]*)<",page).group(1)
			gen = re.search(r"(Yes)|(No)",gen).group(0)
		except:
			gen = "???"
		return gen
	def getAllFaculties(self):
		base = self.getClassTimetableUrl()
		page = self.getPage(base+"subjectSearch.html")
		elemList = re.findall(r'\"[^\"]+\"\>[A-Z]+\<', str(page))
		faculties = []
		for elem in elemList:
			cElem = elem[0:-1]
			code = cElem.split('>')[1]
			link = cElem.split('>')[0][1:-1]
			faculties.append((code,link))
		return faculties
	def getCourses(self,facultyLink):
		base = self.getClassTimetableUrl()
		page = self.getPage(base+facultyLink)
		courses = re.findall(r'\>[A-Z]+[0-9]+\<', str(page))
		courses = list(map(lambda x: x[1:-1], courses))
		return courses
	def getCourseInfo(self,courses):
		params = self.params
		final = []
		if self.numThreads > 1:
			cut = len(courses)/self.numThreads;
			payloads = []
			for i in range(1,self.numThreads+1):
				if(i == self.numThreads):
					payloads.append(courses[(i-1)*cut:])
				else:
					payloads.append(courses[(i-1)*cut:i*cut])
			threads = []
			i = 0
			for payload in payloads:
				threads.append(WebScrapeWorker(i,"Web-Scraper-"+str(i), payload, self))
				i+=1
			before = threading.activeCount()
			for thread in threads:
				thread.start()
			while threading.activeCount() != before:
				pass
			for thread in threads:
				final += thread.results
		else:
			final = self.processPayload(courses)
		return final

	def courseSearch(self,filters):
		if self.validateFilters(filters) != None:
			return self.validateFilters(filters)

		start = time.time()
		params = self.params

		# Get information on needed faculties
		unfilteredFaculties = self.getAllFaculties()
		faculties = []
		for f in unfilteredFaculties:
			if f[0] in filters['fac_code_in']:
				faculties.append(f)

		# now get the complete list of courses
		courses = []
		for fac in faculties:
			courses += self.getCourses(fac[1])

		# filter our courses
		courses = self.filter(courses, filters)

		# generate response
		totalTime = time.time() - start
		response = {}
		response["error"] = False
		response["error-msg"] = ""
		response["status"] = 200
		response["data"] = courses
		response["rows"] = self.resultCols;
		response["time-taken"] = totalTime
		return response

	def filter(self,courses, filters):
		courses = self.getCourseInfo(courses)
		filteredCourses = []
		# do filtering
		gradIndex = self.resultCols.index("Grad Level")
		for result in courses:
			needed = True
			if filters['grad'] != "Both" and result[gradIndex]["data"] != filters['grad']:
				needed = False
			if needed:
				filteredCourses.append(result)
		return filteredCourses

	def validateCourseCode(self,cc):
		url = self.getClassTimetableUrl()+cc+".html"
		result = {}
		try:
			page = self.getPage(url)
			name = re.search(r'\>[A-Z]+[0-9]+ ([^\<\>]+)\<', str(page)).group(1);
			result["courseName"] = name
			result["validity"] = True
		except:
			result["validity"] = False
			result["courseName"] = ""
		return result

	def processPayload(self,payload):
		results = []
		params = self.params
		for course in payload:
			pages = self.getCoursePage(course)
			if(pages == None):
				continue
			rawPage = pages[0]
			coursePage = pages[1]

			grad = re.search(r'Career[^<>]*</td>[^<>]*<td[^<>]*>([^<>]*)<', str(rawPage)).group(1)
			general = self.isGeneralCourse(rawPage)
			link = self.getHandbookLink(rawPage)
			status = self.getCourseStatus(coursePage)
			row = []
			row.append({"data": course,"type": "text"})
			row.append({"data": status,"type": "text"})
			row.append({"data": general,"type": "text"})
			row.append({"data": grad,"type": "text"})
			row.append({"data": link,"type": "link"})
			results.append(row)
		return results

	def validateParams(self):
		params = self.params
		if 'sem' not in params:
			return {"error":True,"error-msg":"Semester missing","status":0};
		if 'year' not in params:
			return {"error":True,"error-msg":"Year missing","status":1};

		# check year is a int
		currYear = datetime.datetime.now().year;
		try:
			int(params['year'])
		except:
			return {"error":True,"error-msg":"Invalid Year","status":2};
		# check year is between 2000 and curr year
		if(int(params['year']) < 2000 or int(params['year']) > currYear):
			return {"error":True,"error-msg":"Invalid Year","status":2};
		# check semester is correct
		if(params['sem'] != "1" and params['sem'] != "2" and params['sem'] != "Summer"):
			return {"error":True,"error-msg":"Invalid semester","status":3};
		return None

	def validateFilters(self,filters):
		params = filters
		if 'fac_code_in' not in params:
			return {"error":True,"error-msg":"Faculty list missing","status":4};
		if 'prereq_in' not in params:
			return {"error":True,"error-msg":"Prerequsite list missing","status":5};
		if 'grad' not in params:
			return {"error":True,"error-msg":"Graduate level missing","status":6};
		# check grad is correct
		if(params['grad'] != "Undergraduate" and params['grad'] != "Postgraduate" and params['grad'] != "Both"):
			return {"error":True,"error-msg":"Invalid grad level","status":9};
		# check at least one faculty exists
		if(len(params['fac_code_in']) == 0):
			return {"error":True,"error-msg":"Minimum Of One Faculty Needed","status":7};
		else:
			#uppercase this shit while checking it
			validFacs = list(map(lambda x: x[0],self.getAllFaculties()))
			altered = []
			for f in params['fac_code_in']:
				f = f.upper()
				if f not in validFacs:
					return {"error":True,"error-msg":"Invalid Faculty Code: "+f,"status":8};
				altered.append(f)
			params['fac_code_in'] = altered
		return None

if __name__ == "__main__":
	params = {
		"sem" : "9",
		"year" : "2017"
	}
	ds = DataStream(params)
	# you NEED to validate the params
	# if you don't you get unexpected stuff
	# for example, any invalid semester defaults to summer
	# semester
	# invalid years should just trigger a urllib2 exception
	valid = ds.validateParams()
	if valid != None:
		print(valid)
		exit()
	filters = {
		"fac_code_in" : ["COMP"],
		"prereq_in":[],
		"grad":"Undergraduate"
	}
	size = 10
	result = ds.courseSearch(filters)
	for res in result["data"]:
		line = ""
		for e in res:
			line += e + "  "
			while len(line) % size != 0:
				line += " "
		print(line)
	print(">> Task done in "+str(round(result["time-taken"],2))+" seconds")
