var AllTeams = [
			{"name": "Arsenal", "logo": "./Images/Arsenal.jpg", "Nickname": "The Gunners", "Founded": 1886, "Stadium": "Emirates Stadium", "Capacity": 60432,
			"Manager": "Arsene Wenger", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=85", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9002",
			"Description": "Arsenal Football Club is an English professional football club based in Holloway, London, that plays in the Premier League, the top flight of English football"},
			{"name": "Bournemouth", "logo": "./Images/Bournemouth.png", "Nickname": "N/A", "Founded": 1899, "Stadium": "Dean Court", "Capacity": 11464,
			"Manager": "Eddie Howe", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=14886", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9053",
			"Description": "AFC Bournemouth is a professional association football club based in Bournemouth, Dorset, that plays in the Premier League, the top tier of the English football league system."},
			{"name": "Burnley", "logo": "./Images/Burnley.png", "Nickname": "The Clarets", "Founded": 1882, "Stadium": "Turf Moor", "Capacity": 21401,
			"Manager": "Sean Dyche", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=1488", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9072",
			"Description": "Burnley Football Club (/ˈbɜːrnli/) is a professional association football club based in Burnley, Lancashire. The team are playing in the Premier League, the highest level of English football in the 2016–17 season after winning the England's second tier league in the 2015–16 season in the Football League Championship."},
			{"name": "Chelsea", "logo": "./Images/Chelsea.png", "Nickname": "The Blues", "Founded": 1905, "Stadium": "Stamford Bridge", "Capacity": 41631,
			"Manager": "Antonio Conte", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=103", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9092",
			"Description": "Chelsea Football Club is an English professional football club based in Fulham, London, that competes in the Premier League. Founded in 1905, the club's home ground since then has been Stamford Bridge"},
			{"name": "Crystal Palace", "logo": "./Images/CrystalPalace.jpg", "Nickname": "Eagles", "Founded": 1905, "Stadium": "Selhurst Park", "Capacity": 25456,
			"Manager": "Alan Pardew", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=8", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=912",
			"Description": "Crystal Palace Football Club is an English professional football club based in South Norwood, London, that plays in the Premier League, the highest tier in English football."},
			{"name": "Everton", "logo": "./Images/Everton.jpg", "Nickname": "The Tofees", "Founded": 1878, "Stadium": "Goodison Park", "Capacity": 39572,
			"Manager": "Ronald Koeman", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=111", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9158",
			"Description": "Everton F.C. /ˈɛvərtən/ are a football club in Liverpool, England, which plays in the Premier League. The club have competed in the top division for a record 114 seasons and won the League Championship nine times and the FA Cup five times."},
			{"name": "Hull City", "logo": "./Images/Hull.png", "Nickname": "The Tigers", "Founded": 1904, "Stadium": "KCOM Stadium", "Capacity": 25450,
			"Manager": "Mike Phelan", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=14883", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9221",
			"Description": "Hull City Association Football Club is a professional association football club based in Hull, East Riding of Yorkshire, England. It was founded in 1904."},
			{"name": "Leicester City", "logo": "./Images/Leicester.jpg", "Nickname": "The Foxes", "Founded": 1884, "Stadium": "King Power Stadium", "Capacity": 32312,
			"Manager": "Claudio Ranieri", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=21", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9240",
			"Description": "Leicester City Football Club, also known as the Foxes, is an English professional football club based at the King Power Stadium in Leicester. They are the current reigning champions of the Premier League."},
			{"name": "Liverpool", "logo": "./Images/Liverpool.png", "Nickname": "The Reds", "Founded": 1892, "Stadium": "Anfield", "Capacity": 54074,
			"Manager": "Jurgen Klopp", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=129", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9249",
			"Description": "Liverpool Football Club is a Premier League association football club based in Liverpool, Merseyside, England."},
			{"name": "Man City", "logo": "./Images/ManCity.png", "Nickname": "The Citizens", "Founded": 1880, "Stadium": "Ethihad Stadium", "Capacity": 60000,
			"Manager": "Pep Guardiola", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=131", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9259",
			"Description": "Manchester City Football Club is a football club in Manchester, England. Founded in 1880 as St. Mark's, they became Ardwick Association Football Club in 1887 and Manchester City in 1894"},
			{"name": "Man United", "logo": "./Images/ManUnited.png", "Nickname": "The Red Devils", "Founded": 1878, "Stadium": "Old Trafford", "Capacity": 75635,
			"Manager": "Jose Mourinho", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=132", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9260",
			"Description": "Manchester United Football Club is a professional football club based in Old Trafford, Greater Manchester, England, that competes in the Premier League, the top flight of English football."},
			{"name": "Middlesbrough", "logo": "./Images/Middlesbrough.jpg", "Nickname": "The Boro", "Founded": 1876, "Stadium": "Riverside Stadium", "Capacity": 34732,
			"Manager": "Aitor Karanka", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=428", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9274",
			"Description": "Middlesbrough Football Club is a professional association football club based in Middlesbrough, North Yorkshire, England. Formed in 1876, they have played at the Riverside Stadium since 1995, their second ground since turning professional in 1889."},
			{"name": "Southampton", "logo": "./Images/Southampton.png", "Nickname": "The Saints", "Founded": 1885, "Stadium": "St. Mary's Stadium", "Capacity": 32505,
			"Manager": "Claude Puel", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=1516", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9363",
			"Description": "Southampton Football Club /saʊθˈæmptən, -hæmptən/ is an English football club, nicknamed The Saints, based in the city of Southampton, Hampshire. They currently compete in the Premier League."},
			{"name": "Stoke City", "logo": "./Images/StokeCity.jpg", "Nickname": "The Potters", "Founded": 1863, "Stadium": "Bet365 Stadium", "Capacity": 27902,
			"Manager": "Steve Bruce", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=461", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9378",
			"Description": "Stoke City Football Club is an English professional football club based in Stoke-on-Trent, Staffordshire that plays in the Premier League."},
			{"name": "Sunderland", "logo": "./Images/Sunderland.jpg", "Nickname": "The Black Cats", "Founded": 1879, "Stadium": "Stadium of Light", "Capacity": 49000,
			"Manager": "David Moyes", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=462", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9384",
			"Description": "Sunderland Association Football Club is an English professional football club based in the North East city of Sunderland in the larger metropolitan area of Tyne and Wear."},
			{"name": "Swansea City", "logo": "./Images/SwanseaCity.png", "Nickname": "The Swans", "Founded": 1912, "Stadium": "Liberty Stadium", "Capacity": 21088,
			"Manager": "Bob Bradey", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=67", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9387",
			"Description": "Swansea City Association Football Club is a Welsh professional football club based in Swansea, Wales, that plays in the Premier League, the highest level of English football."},
			{"name": "Tottenham", "logo": "./Images/Tottenham.jpg", "Nickname": "Spurs", "Founded": 1882, "Stadium": "White Hart Lane", "Capacity": 36284,
			"Manager": "Mauricio Pochettino", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=68", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9406",
			"Description": "Tottenham Hotspur Football Club /ˈtɒtᵊnəm/, commonly referred to as Spurs, is an English football club located in Tottenham, Haringey, London, that competes in the Premier League. The club's home stadium is White Hart Lane."},
			{"name": "Watford", "logo": "./Images/Watford.png", "Nickname": "The Hornets", "Founded": 1881, "Stadium": "Vicarage Road", "Capacity": 21438,
			"Manager": "Gino Pozzo", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=14887", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9423",
			"Description": "Watford Football Club is a football club based in Watford, Hertfordshire, England, that plays in the Premier League. Founded in 1881 as Watford Rovers, the club entered the FA Cup for the first time in 1886, and the Southern League a decade later."},
			{"name": "West Brom", "logo": "./Images/WestBrom.png", "Nickname": "The Baggies", "Founded": 1878, "Stadium": "The Hawthorns", "Capacity": 26850,
			"Manager": "Tony Pulis", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=76", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9426",
			"Description": "West Bromwich Albion Football Club /ˈbrɒmɪtʃ/, also known as West Brom, The Baggies, The Throstles, Albion or simply WBA, is an English professional football club based in West Bromwich in the West Midlands."},
			{"name": "West Ham", "logo": "./Images/WestHam.png", "Nickname": "The Hammers", "Founded": 1895, "Stadium": "London Stadium", "Capacity": 60000,
			"Manager": "Slaven Bilic", "latestNews": "http://cdn.footballfancast.com/widgets/latest-news/widget-mpu.html?cat=77", "stats": "http://www.soccerstats247.com/TeamStatisticsWidget.aspx?langId=1&teamId=9427",
			"Description": "West Ham United Football Club is a professional football club based in Stratford, East London, England, that competes in the Premier League, England's top tier of football."}			
];



export default AllTeams;