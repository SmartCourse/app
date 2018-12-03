const { TABLE_NAMES } = require('../src/models/constants')
const faculties = require('./faculties')

module.exports = [
  {
    name: 'Bachelor of Actuarial Studies/Advanced Mathematics (Honours)',
    faculty: 'Business School',
    tags:
      'applied mathematics advanced statistics finance insurance financial modelling business economics finance strategy',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Actuarial Studies (Co-op)',
    faculty: 'Business School',
    tags:
      'finance mathematics business information systems statistics business economics finance strategy marketing business law accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Actuarial Studies/Commerce',
    faculty: 'Business School',
    tags:
      'mathematics business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Actuarial Studies/Law',
    faculty: 'Law',
    tags:
      'legal actuary risk manager statistics insurance analyst business economics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Actuarial Studies/Economics',
    faculty: 'Business School',
    tags:
      'econometrics economics analytics statistics business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation HRM',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Actuarial Studies/Science',
    faculty: 'Business School',
    tags: 'statistics mathematics insurance industry scientific methodology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Actuarial Studies',
    faculty: 'Business School',
    tags:
      'finance mathematics statistics risk insurance actuary business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation HRM',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Mathematics (Honours)/Arts',
    faculty: 'Science',
    tags:
      'advanced statistics applied mathematics pure mathematics quantitative risk social sciences',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Mathematics (Honours)/Commerce',
    faculty: 'Business School',
    tags:
      'advanced statistics applied mathematics financial modelling accounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Mathematics (Honours)/Computer Science',
    faculty: 'Science',
    tags:
      'advanced statistics applied pure mathematics e-commerce programming accounting business finance financial economics human resource strategy marketing lawmanagement accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Mathematics (Honours)/Engineering (Honours)',
    faculty: 'Science',
    tags:
      'advanced statistics applied mathematics pure mathematics quantitative risk renewable energy',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Mathematics (Honours)/Law',
    faculty: 'Law',
    tags: 'statistics applied mathematics pure mathematics quantitative risk',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Mathematics (Honours)',
    faculty: 'Science',
    tags:
      'applied mathematics mathematics pure mathematics statistics quantitative risk statistician mathematician',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Science (Honours)/Arts',
    faculty: 'Science',
    tags:
      'language studies media molecular and cell biology neuroscience international relations',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Science (Honours)/Computer Science',
    faculty: 'Science',
    tags:
      'earth science programming algorithms biotechnology climate systems science',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Science (Honours)/Engineering (Honours)',
    faculty: 'Science',
    tags: 'anatomy biotechnology climate dynamics ecology pathology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Science (Honours)/Fine Arts',
    faculty: 'Science',
    tags: 'visual arts object design materials science physics psychology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Science (Honours)/Law',
    faculty: 'Law',
    tags: 'biotechnology climate science neuroscience physics statistics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Science (Honours)/Social Research and Policy',
    faculty: 'Science',
    tags:
      'policy analysis research methods oceanography marine and coastal science molecular and cell biology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Advanced Science (Honours)',
    faculty: 'Science',
    tags:
      'research advanced science chemistry physical oceanography climate systems climate dynamics microbiology ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Architectural Studies',
    faculty: 'Built Environment',
    tags:
      'architectural design architecture building design architectural technology design',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Architectural Studies (UNSW / Tongji)',
    faculty: 'Built Environment',
    tags:
      'architectural studies built environment sustainability architectural science architectural design',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Art Theory/Arts',
    faculty: 'Art & Design',
    tags:
      'aboriginal studies cultural studies humanities sociology and anthropology art history curatorial studies museum studies',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Art Theory/Law',
    faculty: 'Law',
    tags:
      'art history contemporary art modern art visual culture social justice',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Art Theory/Social Research and Policy',
    faculty: 'Art & Design',
    tags:
      'arts administration art criticism art history policy studies social policy',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Arts and Business/Law',
    faculty: 'Law',
    tags: 'business finance diplomacy government social researcher',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Arts and Business',
    faculty: 'Arts & Social Sciences',
    tags:
      'economics cultural studies humanities sociology and anthropology management',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Arts/Education (Secondary)',
    faculty: 'Arts & Social Sciences',
    tags:
      'teaching teaching degree art teacher teaching qualification secondary education',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Arts/Law',
    faculty: 'Law',
    tags: 'business finance diplomacy government legal practice',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Arts',
    faculty: 'Arts & Social Sciences',
    tags:
      'aboriginal studies economics cultural studies humanities sociology and anthropology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Aviation (Flying)',
    faculty: 'Science',
    tags:
      'pilot pilot training flight operations aviation management airline economics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Aviation (Management)',
    faculty: 'Science',
    tags:
      'airline economics airport management aviation law airline management airline strategy',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Actuarial Studies (Honours)',
    faculty: 'Business School',
    tags: null,
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Architectural Studies (Honours) ',
    faculty: 'Built Environment',
    tags:
      'architectural design architecture building design architectural technology design',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Art Theory (Honours)',
    faculty: 'Art & Design',
    tags:
      'arts administration art criticism art history curatorial studies museum studies',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Art Theory',
    faculty: 'Art & Design',
    tags:
      'arts administration art criticism art history curatorial studies museum studies',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Arts & Social Sciences (Honours) ',
    faculty: 'Arts & Social Sciences',
    tags: null,
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Computational Design (Honours) ',
    faculty: 'Built Environment',
    tags:
      'building information modelling digital fabrication virtual environments 3D modelling urban design',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Design (Honours)',
    faculty: 'Art & Design',
    tags:
      'honours media and communication experience design interaction design visualisation virtual reality',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Design',
    faculty: 'Art & Design',
    tags:
      'media and communications experience design interaction design visualisatio virtual reality visual communication graphic design',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Aerospace Engineering)',
    faculty: 'Engineering',
    tags: 'aerospace space flight flying plane',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Civil)',
    faculty: 'Engineering',
    tags: 'civil engineering construction ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Computer)',
    faculty: 'Engineering',
    tags: 'computer engineering software programming ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Chemical Product Engineering)',
    faculty: 'Engineering',
    tags: 'chemical product engineering',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Electrical)',
    faculty: 'Engineering',
    tags: 'electrical engineering wiring power electricity',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Environmental)',
    faculty: 'Engineering',
    tags: 'environmental engineering water geotechnical transport water waste',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Mechatronic)',
    faculty: 'Engineering',
    tags: 'mechatronics engineering automation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Mining)',
    faculty: 'Engineering',
    tags: 'Mining earth minerals resources engineering',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Petroleum)',
    faculty: 'Engineering',
    tags: 'petroleum oil gas engineering mining drilling ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Photovoltaics and Solar Energy)',
    faculty: 'Engineering',
    tags: 'Photovoltaics Solar energy renewable green',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Software)',
    faculty: 'Engineering',
    tags: 'software engineering programming ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Surveying)',
    faculty: 'Engineering',
    tags: 'surveying engineering construction satelite ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Telecommunications)',
    faculty: 'Engineering',
    tags: 'telecommunications phone internet engineering ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Fine Arts (Honours)',
    faculty: 'Art & Design',
    tags:
      'painting drawing photography printmaking sculpture moving image art visual art contemporary art fine art',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Bioinformatics)',
    faculty: 'Engineering',
    tags: 'bioinformatics genetics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Fine Arts',
    faculty: 'Art & Design',
    tags:
      'painting drawing photography printmaking sculpture moving image visual art moving image fine art contemporary art',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media Arts (Honours)',
    faculty: 'Art & Design',
    tags:
      'animation interactive media film production immersive media video art digital media',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media Arts',
    faculty: 'Art & Design',
    tags:
      'animation visual effects sound moving image interactive media film production immersive media video art digital media',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media (Public Relations & Advertising)',
    faculty: 'Arts & Social Sciences',
    tags: 'public relations advertising media relations communications',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Politics, Philosophy and Economics',
    faculty: 'Arts & Social Sciences',
    tags:
      'international relations policy law social science development studies',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Biotechnology (Honours)',
    faculty: 'Science',
    tags:
      'biochemistry bioengineering biology genetics molecular biology biotechnology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of City Planning (Honours)/Law',
    faculty: 'Law',
    tags:
      'environmental law strata law urban planning urban development sustainability',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of City Planning (Honours)',
    faculty: 'Built Environment',
    tags:
      'urban planning environmental planning urban development city and regional planning urban studies',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Advanced Science (Honours)',
    faculty: 'Business School',
    tags:
      'mathematics climate studies statistics accounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Arts',
    faculty: 'Business School',
    tags:
      'politics finance business diplomacy language studies business economics finance strategy marketing law management accounting management finance financial human resource management information systems international business management real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Aviation (Management)',
    faculty: 'Business School',
    tags:
      'airline economics airline financial management aviation law airport management business economics finance strategy marketing law management accounting management finance financial human resource management information systems international business management real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce (Co-op) (Honours)',
    faculty: 'Business School',
    tags:
      'industry placements business finance information systems international business economics finance strategy marketing law management accounting management finance financial human resource management information systems international business management real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce (Co-op)',
    faculty: 'Business School',
    tags:
      'business economics finance strategy marketing law management accounting management finance financial human resource management information systems international business management real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Computer Science',
    faculty: 'Business School',
    tags:
      'information systems AI artificial intelligence e-commerce security business economics finance strategy marketing law management accounting management finance financial human resource management information systems international business management real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Education (Secondary)',
    faculty: 'Arts & Social Sciences',
    tags:
      'business studies teacher economics school accounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Economics',
    faculty: 'Business School',
    tags:
      'accounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Fine Arts',
    faculty: 'Business School',
    tags:
      'visual arts media painting sculpture accountancy accounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce (Honours)',
    faculty: 'Business School',
    tags:
      'business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation HRM',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Design',
    faculty: 'Business School',
    tags:
      'arts management graphic design business studies product design creative designbusiness economics finance strategy marketing law management accounting management finance financial human resource management information systems international business management real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Information Systems',
    faculty: 'Business School',
    tags:
      'business analysis analytics process management information technology networking security business economics finance strategy marketing law management accounting management finance financial human resource management information systems international business management real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce (International)',
    faculty: 'Business School',
    tags:
      'language studies overseas exchange international studies international business international relations marketing management',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Law',
    faculty: 'Law',
    tags:
      'accounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Media (PR and Advertising)',
    faculty: 'Business School',
    tags:
      'organisational communication communications accounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce/Science',
    faculty: 'Business School',
    tags:
      'business human resource management statistics ecology microbiology marketing management',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Commerce',
    faculty: 'Business School',
    tags:
      'business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation HRM',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Computational Design',
    faculty: 'Built Environment',
    tags:
      'building information modelling digital fabrication virtual environments 3D modelling urban design',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Computer Science/Law',
    faculty: 'Law',
    tags:
      'forensics intellectual property internet cybespace law information technology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Computer Science/Arts',
    faculty: 'Engineering',
    tags:
      'AI software development programming artificial intelligence algorithms',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Computer Science',
    faculty: 'Engineering',
    tags:
      'AI software development programming artificial intelligence algorithms',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Computer Science/Media Arts',
    faculty: 'Engineering',
    tags:
      'software development programming artificial intelligence algorithms animation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Construction Management and Property',
    faculty: 'Built Environment',
    tags:
      'project management quantity surveying property development construction project management construction program',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Criminology & Criminal Justice/Law',
    faculty: 'Law',
    tags: 'crime prisonx police policy security',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Criminology & Criminal Justice',
    faculty: 'Arts & Social Sciences',
    tags: 'CSI crime criminal law policing justice',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Data Science and Decisions',
    faculty: 'Science',
    tags:
      'quantitative data science computational data science business data science data analytics statistics analyst modelling data engineer business analyst',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Design/Education (Secondary)',
    faculty: 'Arts & Social Sciences',
    tags: 'visual arts graphics multimedia design teacher design theory',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Design/Media (PR and Advertising)',
    faculty: 'Art & Design',
    tags:
      'innovation experience design interaction design visualisation virtual reality',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Economics/Advanced Science (Honours)',
    faculty: 'Business School',
    tags:
      'econometrics financial economics oceanography biotechnology climate dynamics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Economics/Arts',
    faculty: 'Business School',
    tags:
      'language studies economics econometrics financial economics politics business business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation HRM',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Economics/Education (Secondary)',
    faculty: 'Arts & Social Sciences',
    tags:
      'economics degree economics teacher economics and education business teacher',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Economics/Advanced Mathematics (Honours)',
    faculty: 'Business School',
    tags:
      'econometrics financial economics statistics advanced statistics applied mathematics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Economics (Honours)',
    faculty: 'Business School',
    tags:
      'econometrics financial economics finance statistics business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation HRM',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Economics/Law',
    faculty: 'Law',
    tags: 'finance statistics insurance analyst compliance',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Economics/Science',
    faculty: 'Business School',
    tags:
      'econometrics financial economics statistics biology physics business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation HRM',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Renewable Energy)',
    faculty: 'Engineering',
    tags: 'renewable energy engineering photovoltaics solar green',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Economics',
    faculty: 'Business School',
    tags:
      'econometrics financial economics finance statistics business economics finance strategy marketing business law accounting finance financial human resource management information systems international business management real-estate studies taxation HRM',
    type: 'undergraduate'
  },
  {
    name:
      'Bachelor of Engineering (Civil Engineering with Architecture) (Honours)',
    faculty: 'Engineering',
    tags:
      'civil with architecture architecture infrastructure construction structural engineering',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Chemical)',
    faculty: 'Engineering',
    tags: 'Chemical engineering ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours)/Arts',
    faculty: 'Engineering',
    tags: 'construction finance journalism economics humanities',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours)/Commerce',
    faculty: 'Engineering',
    tags:
      'financial management accounting human resource management finance ICT analyst marketing management',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours)/Computer Science',
    faculty: 'Engineering',
    tags:
      'AI software development programming artificial intelligence algorithms',
    type: 'undergraduate'
  },
  {
    name:
      'Bachelor of Engineering (Honours)/Engineering Science (Civil/Mining or Mining/Civil)',
    faculty: 'Engineering',
    tags:
      'mining engineering civil engineering environmental engineering industrial chemistry petroleum engineering',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours)/Law',
    faculty: 'Law',
    tags: 'technology science construction infrastructure social justice',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours)/Master of Biomedical Engineering',
    faculty: 'Engineering',
    tags: 'biomedical electrical mechatronic medical technology bionics',
    type: 'undergraduate'
  },
  {
    name:
      'Bachelor of Engineering (Honours)/Master of Engineering (Electrical Engineering)',
    faculty: 'Engineering',
    tags: 'aerospace bioinformatics geospatial nuclear photovoltaics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours)/Science',
    faculty: 'Engineering',
    tags:
      'computer science materials science marine science biochemistry genetics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Civil)/Surveying',
    faculty: 'Engineering',
    tags: 'land management architecture cartography mapping mining',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours)',
    faculty: 'Engineering',
    tags: 'aerospace bioinformatics manufacturing software engineer surveying',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Environmental Management/Arts',
    faculty: 'Science',
    tags:
      'earth science communications geography environmental management marine science',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Environmental Management',
    faculty: 'Science',
    tags: 'chemistry earth science ecology geography marine coastal science',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Exercise Physiology',
    faculty: 'Medicine',
    tags: 'exercise health physical activity rehabilitation chronic disease',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Fine Arts/Arts',
    faculty: 'Art & Design',
    tags:
      'painting drawing photography printmaking sculpture moving image art visual art contemporary art fine art',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Fine Arts/Education (Secondary)',
    faculty: 'Arts & Social Sciences',
    tags:
      'art education fine arts teacher visual arts teacher fine arts education visual arts education',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Fine Arts/Law',
    faculty: 'Law',
    tags: 'copyright design media creative arts artistic media',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Food Science (Honours)',
    faculty: 'Engineering',
    tags: 'food technology engineering science nutrition food systems',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Industrial Design',
    faculty: 'Built Environment',
    tags:
      'user experience design management technology design presentation marketing',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Information Systems (Co-op)(Honours)',
    faculty: 'Business School',
    tags:
      'business analysis enterprise systems business analytics information technology networking security',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Information Systems',
    faculty: 'Business School',
    tags:
      'business analysis enterprise systems business analytics information technology networking security',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Interior Architecture (Honours)',
    faculty: 'Built Environment',
    tags:
      'built environment interior design design corporate interior design aesthetics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of International Public Health',
    faculty: 'Medicine',
    tags:
      'public health international development health systems global health',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of International Studies/Law',
    faculty: 'Law',
    tags: 'foreign affairs government diplomacy risk analysis languages',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of International Studies/Media (Comm & Journalism)',
    faculty: 'Arts & Social Sciences',
    tags: 'journalism degree international media communications degree',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of International Studies/Media (PR and Advertising)',
    faculty: 'Arts & Social Sciences',
    tags:
      'public relations degree international pr international advertising advertising degree',
    type: 'undergraduate'
  },
  {
    name:
      'Bachelor of International Studies/Media (Screen and Sound Production)',
    faculty: 'Arts & Social Sciences',
    tags:
      'cultural studies international relations multimedia politics media production',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of International Studies',
    faculty: 'Arts & Social Sciences',
    tags:
      'asian studies development european studies international business international relations',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Life Sciences',
    faculty: 'Science',
    tags: 'anatomy biochemistry biology marine science microbiology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Landscape Architecture (Honours)',
    faculty: 'Built Environment',
    tags:
      'built environment landscape design sustainability urbanisation design consultant',
    type: 'undergraduate'
  },
  {
    name:
      'Bachelor of Materials Science and Engineering (Honours)/Biomedical Engineering',
    faculty: 'Science',
    tags:
      'biocompatibility robotic surgery bioinformatics metallurgy materials engineering Functional materials',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Materials Science and Engineering (Honours)/Commerce',
    faculty: 'Science',
    tags:
      'chemical engineering metallurgy materials engineering Functional materials accounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name:
      'Bachelor of Materials Science and Engineering (Honours)/Engineering Science',
    faculty: 'Science',
    tags:
      'ceramic engineering chemical engineering physical metallurgy process metallurgy materials engineering Functional material',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Materials Science and Engineering (Honours)',
    faculty: 'Science',
    tags:
      'ceramic engineering materials engineering physical metallurgy process metallurgy polymer Functional materials',
    type: 'undergraduate'
  },
  {
    name:
      'Bachelor of Engineering (Honours) (Mechanical and Manufacturing Engineering)',
    faculty: 'Engineering',
    tags: 'Mechanical manufacturing engineering ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Engineering (Honours) (Mechanical Engineering)',
    faculty: 'Engineering',
    tags: 'mechanical engineering machines ',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media Arts/Education (Secondary)',
    faculty: 'Arts & Social Sciences',
    tags:
      'multimedia teaching secondary school teaching graphics and multimedia visual arts',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media (Comm & Journalism)/Law',
    faculty: 'Law',
    tags: 'correspondent reporter news social justice analyst',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media (Comm & Journalism)',
    faculty: 'Arts & Social Sciences',
    tags:
      'media news media public relations digital media corporate communications',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media (PR and Advertising)/Law',
    faculty: 'Law',
    tags: 'film television entertainment copyright public relations',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media (Screen and Sound Production)/Law',
    faculty: 'Law',
    tags: 'entertainment law television film music copyright',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Media (Screen and Sound Production)',
    faculty: 'Arts & Social Sciences',
    tags:
      'animation film studies screenwriting media production audio production',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Medical Science',
    faculty: 'Science',
    tags: 'anatomy molecular biology genetics pharmacology pathology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Medicinal Chemistry (Honours)/Law',
    faculty: 'Law',
    tags: 'biotechnology forensics pharmacology technology healthcare',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Medicinal Chemistry (Honours)',
    faculty: 'Science',
    tags:
      'biochemistry drug design drug development organic chemistry pharmacology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Medical Studies/Doctor of Medicine/Arts',
    faculty: 'Medicine',
    tags:
      'biomedical sciences clinical sciences medical studies medical doctor surgeon',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Medical Studies/Doctor of Medicine',
    faculty: 'Medicine',
    tags:
      'biomedical sciences clinical sciences medical studies medical doctor surgeon',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Arts',
    faculty: 'Arts & Social Sciences',
    tags:
      'music creative practice linguistics social sciences multimedia cultural studies',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Advanced Science (Honours)',
    faculty: 'Arts & Social Sciences',
    tags:
      'composition music creative practice science of music biology physics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Commerce',
    faculty: 'Arts & Social Sciences',
    tags:
      'music creative practice iaccounting business finance financial economics human resource strategy marketing law management accounting finance financial human resource management information systems international business real-estate studies taxation',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Education (Secondary)',
    faculty: 'Arts & Social Sciences',
    tags:
      'secondary school teaching music teaching musicianship musicology teaching',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Engineering (Honours)',
    faculty: 'Arts & Social Sciences',
    tags: 'music studies telecommunications solar environment aerospace',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Law',
    faculty: 'Law',
    tags: 'entertainment copyright musicology composition arts',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Media (Comm & Journalism)',
    faculty: 'Arts & Social Sciences',
    tags:
      'musicology professional communications multimedia news media public relations',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Media (PR and Advertising)',
    faculty: 'Arts & Social Sciences',
    tags:
      'corporate communications strategic communications music creative practice musicology music performance',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Media (Screen and Sound Production)',
    faculty: 'Arts & Social Sciences',
    tags:
      'animation game design film studies music creative practice musicology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music/Science',
    faculty: 'Arts & Social Sciences',
    tags: 'music studies earth science microbiology physics mathematics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Music',
    faculty: 'Arts & Social Sciences',
    tags:
      'musicology music technology composition music performance music creative practice',
    type: 'undergraduate'
  },
  {
    name: 'Placeholder (Do Not Delete)',
    faculty: 'Science',
    tags: 'Placeholder',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Psychological Science/Law',
    faculty: 'Law',
    tags:
      'psychologist psychiatrist social worker counsellor social justice marketing management',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Psychological Science',
    faculty: 'Science',
    tags:
      'criminology neuroscience vision science philosophy psychology marketing management human resource management linguistics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Psychology (Honours)/Law',
    faculty: 'Law',
    tags: 'psychologist psychiatrist social worker counsellor social justice',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Psychology (Honours)',
    faculty: 'Science',
    tags:
      'psychology Honours cognitive science social psychology developmental psychology perception language abnormal psychology neuroscience health psychology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science and Business/Law',
    faculty: 'Law',
    tags: 'management risk analysis patent medicine policy adviser',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science/Arts',
    faculty: 'Science',
    tags: 'language studies media physics chemistry international relations',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science and Business',
    faculty: 'Science',
    tags: 'accounting anatomy biotechnology business human resources',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science/Computer Science',
    faculty: 'Engineering',
    tags:
      'AI software development programming artificial intelligence algorithms',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science/Education (Secondary)',
    faculty: 'Arts & Social Sciences',
    tags:
      'secondary school teacher maths teacher science teacher environmental science biology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science/Fine Arts',
    faculty: 'Science',
    tags: 'biology chemistry physics visual arts object design',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science (International)',
    faculty: 'Science',
    tags:
      'cultural studies language studies scientific research scientific theory chemistry',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science/Law',
    faculty: 'Law',
    tags: 'neuroscience pharmacology physiology statistics psychology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science/Social Research and Policy',
    faculty: 'Science',
    tags: 'policy analysis research methods physics chemistry biology',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Science',
    faculty: 'Science',
    tags:
      'Chemsitry biology food science pharmacology physiology anatomy microbiology bioinformatics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Social Research and Policy/Law',
    faculty: 'Law',
    tags:
      'public policy human rights community service social science government adviser',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Social Research and Policy',
    faculty: 'Arts & Social Sciences',
    tags:
      'policy analysis research methodology development studies international relations politics',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Social Work (Honours)/Arts',
    faculty: 'Arts & Social Sciences',
    tags:
      'social theory welfare cultural studies mental health social sciences',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Social Work (Honours)/Criminology & Criminal Justice',
    faculty: 'Arts & Social Sciences',
    tags: 'criminal law policy crime mental health counselling',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Social Work (Honours)/Law',
    faculty: 'Law',
    tags: 'human rights family law consumer protection social justice policy',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Social Work (Honours)/Social Research and Policy',
    faculty: 'Arts & Social Sciences',
    tags:
      'social theory sociology policy studies international relations research methods',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Social Work (Honours)',
    faculty: 'Arts & Social Sciences',
    tags: 'social theory counselling mental health social studies welfare',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Vision Science/Clinical Optometry',
    faculty: 'Science',
    tags: 'optometry anatomy ocular therapy sports vision paediatric optometry',
    type: 'undergraduate'
  },
  {
    name: 'Bachelor of Vision Science',
    faculty: 'Science',
    tags: 'optometry anatomy ocular therapy psychophysics optics',
    type: 'undergraduate'
  }
].map(({ name, faculty, ...rest }) => ({
  name: name.startsWith('Bachelor of')
    ? 'B.' + name.split('Bachelor of')[1]
    : name,
  facultyID: 1 + faculties.findIndex((f) => f.name === faculty),
  longName: name,
  ...rest
}))
