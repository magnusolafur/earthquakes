task :scraper => :environment do
	require 'nokogiri'
	require 'csv'
	require 'open-uri'

	doc = Nokogiri::HTML(open("http://hraun.vedur.is/ja/skjalftar/skjlisti.html"))
	csv = CSV.open("public/eartquakes.csv", 'w')
	csv << ["date", "t", "lon", "lat", "depth", "sz", "quality", "dist", "dir", "loc"]
	i = 0
	doc.xpath('//table//tr').each do |row|
    	tarray = [] #temporary array
    	row.xpath('td').each do |cell|
        	tarray << cell.text
    	end
		csv << tarray unless i == 0 || i == 1
		i += 1
	end

	csv.close
end
