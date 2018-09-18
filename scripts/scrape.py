
import sys
import requests
import time
import re
import json
from bs4 import BeautifulSoup

# TODO maybe make these adjustable
PAGE_SIZE = 50
YEAR = 2019

BASE_URL = 'https://www.handbook.unsw.edu.au'
URL = BASE_URL+"/api/content/query/+contentType:subject%20-subject.active:0%20+subject.implementation_year:***%20+subject.code:*{code}*%20+subject.study_level:undergraduate%20+deleted:false%20+working:true/offset/{offset}/limit/"+str(PAGE_SIZE)+"/orderby/subject.code%20asc"
COURSE_URL = BASE_URL+"/{study_level}/courses/"+str(YEAR)+"/{code}"

seen_courses = set()

def scrape_subject_areas():
    r = requests.get(BASE_URL)
    html = BeautifulSoup(r.text, 'html.parser')
    areas_html = html.find(id="tab_educational_area")
    # map of code to {name, url}
    areas = {}
    for item in areas_html.find_all('a'):
        url = item['href']
        text = item.find('h3').string
        # split text into code and name of area
        code, name = re.match(r'([A-Z]+):\s*(.+)', text).groups()
        areas[code] = {'url':url, 'name':name}
    return areas

def scrape_courses(area_code):
    courses = []

    sys.stderr.write("adding courses in {}\n".format(area_code))

    for i in range(0,300,PAGE_SIZE):
        url = URL.format(code=area_code, offset=i)
        r = requests.get(url)

        courses_array = r.json()['contentlets']
        if len(courses_array) == 0:
            break

        time.sleep(0.2)


        for course in courses_array:

            # skip courses that don't fit our schema
            if any([it not in course for it in ['study_level', 'code', 'name']]):
                continue

            # avoid duplicate courses
            if course['code'] in seen_courses:
                continue
            seen_courses.add(course['code'])

            # some courses are missing description
            if 'description' in course:
                desc_soup = BeautifulSoup(course['description'], 'html.parser')
                description = desc_soup.get_text()
            else:
                description = ""

            study_level = course['study_level'].lower()
            course_url = COURSE_URL.format(study_level=study_level, code=course['code'])

            # get course outline link
            course_req = requests.get(course_url)
            time.sleep(0.1)
            course_html = BeautifulSoup(course_req.text, 'html.parser')

            # get prerequesites if they exist
            p = course_html.find(id='readMoreSubjectConditions')
            if p is None:
                prereqs = ""
            else:
                prereqs = p.find('div').find('div').string

            # some courses are missing a link to outline
            o = course_html.find(id='subject-outline')
            if o is None:
                course_outline = ""
            else:
                course_outline = o.find('a')['href']

            # I'm not sure but probably some courses are missing keywords
            if 'keywords' in course:
                keywords = course['keywords']
            else:
                keywords = ""

            courses.append({
                'name'          : course['name'],
                'study_level'   : study_level,
                'code'          : course['code'],
                'keywords'      : keywords,
                'description'   : description,
                'handbook_url'  : course_url,
                'outline_url'   : course_outline,
                'requirements'  : prereqs
                })

            sys.stderr.write("added {}\n".format(course['name']))

    return courses


def main():
    areas_basic = scrape_subject_areas()
    areas = []
    for code,area in areas_basic.items():
        areas.append({
            'code'      : code,
            'name'      : area['name'],
            'url'       : BASE_URL+area['url'],
            'courses'   : scrape_courses(code)})
    print(json.dumps(areas))


if __name__=='__main__':
    main()

