import sys
import os
import re
import requests

# Class to handle a timetable
class timetable:
    def __init__(self, courseCode, semester):
        self.classes = extract(courseCode, semester)
                self.selected = {}
                for k in self.classes:
                    self.selected[k] = None
        def generateTimetable(self):
            return None

#removes tags from a line leaving just the information
def clean(input):
    result = re.sub(r'\<[^>]*\>','',input)
        result = re.sub(r'\s\s+','',result)
        return result

#gets all class data for a given courseCode in a given semester
def extract(courseCode, semester, year):
    url = "http://timetable.unsw.edu.au/%d/%s.html"%(year,courseCode.upper())
        r = requests.get(url)
        array = r.text.split('\n')
        currSemester = None
        currRow = []
        final = []
        inRow = False
        isRunning = False

        for i,line in enumerate(array):
            # update current semester
                try:
                    re.search(r'(SUMMARY OF SEMESTER ONE CLASSES)', line).group(1)
                        currSemester = 1
                except:
                    try:
                        re.search(r'(SUMMARY OF SEMESTER TWO CLASSES)', line).group(1)
                                currSemester = 2
                    except:
                        try:
                            re.search(r'(SUMMARY OF SUMMER TERM CLASSES)', line).group(1)
                                        currSemester = 0
                        except:
                            currSemester = currSemester
                                        try:
                                            re.search(r'(CLASSES \- Detail)', line).group(1)
                                                currSemester = None
                                        except:
                                            currSemester = currSemester
                # see if worth doing any processing
                if currSemester != semester:
                    continue

                #check if in row
                s = re.search(r'(\<tr class\=)', line)
                if s:
                    if s.group(1):
                        inRow = True
                                continue
                #check is end of row
                s = re.search(r'(\/tr)', line)
                if s:
                    if s.group(1) and inRow:
                        final.append(currRow)
                                currRow = []
                                inRow = False
                                continue
                #get data if in row (single line)
                s = re.search(r'\<td[^\>]*\>(.*)\<\/td\>', line)
                if s:
                    if s.group(1) and inRow:
                        currRow.append(clean(s.group(1)))
                                continue
        #neaten
        result = {}
        for l in final:
            if l[0] not in result:
                result[l[0]] = []
                        result[l[0]].append(l[2:])
                else:
                    result[l[0]].append(l[2:])
        return result

def extractAndWrite(f,course,sem,year):
    s = extract(course, sem, year)
        for k in s:
            f.write("--%s--\n"%k)
                for r in s[k]:
                    f.write("	".join(r))
                        f.write("\n")

if __name__ == "__main__":
    f = open("all.txt","w")
        courses = ["COMP1511"]
        sems = [1,2]
        year = 2017
        for course in courses:
            for sem in sems:
                extractAndWrite(f,course,sem,year)
f.close()
