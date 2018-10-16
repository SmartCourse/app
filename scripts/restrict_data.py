#!/usr/bin/env python

import json

with open('course_data_2019.json.old', 'r') as f:
    data = json.load(f)

for i, subject in enumerate(data):
    for j, course in enumerate(subject['courses']):
        des = course['description']
        req = course['requirements']
        dlimit = 200
        rlimit = 150
        total = dlimit + rlimit

        # if there is no requirements add a palceholder
        if (len(req) == 0):
            req = 'No requirements found.'
        
        # check if filtering is needed
        if (len(des) + des.count('\n') * 40 + len(req) + req.count('\n') * 40 < total):
            continue

        # account for newlines taking up space
        dlimit -= des.count('\n') * 40
        rlimit -= req.count('\n') * 40

        # adjust limits
        if (len(des) < dlimit):
            free_lines = (dlimit - len(des)) / 40
            rlimit += free_lines * 35
        elif (len(req) < rlimit):
            free_lines = (rlimit - len(req)) / 40
            dlimit += free_lines * 35

        # check if we are actually cutting one of these down
        des_cut = len(des) > dlimit
        req_cut = len(req) > rlimit

        # restrict to a certain number of characters
        des = des[:dlimit]
        req = req[:rlimit]

        # try and finish on a sentence
        if len(des.split('.')) > 1: des = '.'.join(des.split('.')[:-1])
        if len(req.split('.')) > 1: req = '.'.join(req.split('.')[:-1])

        # add elipses if thingo was cut
        if (des_cut): des += '...'
        if (req_cut): req += '...'

        # set the new values
        data[i]['courses'][j]['description'] = des
        data[i]['courses'][j]['requirements'] = req

with open('course_data_2019.json', 'w') as f:
    json.dump(data, f)
