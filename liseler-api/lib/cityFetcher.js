const rp = require('request-promise');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

const schoolTypeDetector = require('./schoolTypeDetector');
const getLatLonFromUniqueName = require('./getLatLonFromUniqueName');

const cityFetcher = async (plateId, pageId = 1, data = []) => {
  console.log(`Schools fetching for plate ${plateId} on page ${pageId}`);

  const rpOptions = {
    uri: `${process.env.MEB_URL}?ILKODU=${plateId}&SAYFANO=${pageId}`,
    encoding: null,
  };
  const rawOutput = await rp(rpOptions);
  const response = iconv.decode(rawOutput, 'windows-1254');

  const $ = cheerio.load(response);

  // Find total schools
  const totalSchoolsText = $('#grid i')
    .text()
    .replace('Bulunan Kayıt Sayısı: ', '');

  const totalSchools = parseInt(totalSchoolsText, 10);

  $('#grid table tr').each(async (index, element) => {
    if (index === 0) {
      return;
    }

    const schoolFullName = $(element)
      .find('td')
      .eq(0)
      .text();

    if (data.find(item => item.fullName === schoolFullName)) {
      return;
    }

    const [city, town, ...schoolNameParts] = schoolFullName.split('-').map(item => item.trim());
    const schoolName = schoolNameParts.map(item => item.trim()).join('-');
    const schoolType = schoolTypeDetector(schoolName);

    // Get lat,lon
    const schoolUniqueName = $(element)
      .find('td')
      .eq(2)
      .find('img')
      .data('host');

    const website = `http://${schoolUniqueName}.meb.k12.tr`;

    try {
      const { lat, lon } = await getLatLonFromUniqueName(schoolUniqueName);
      data.push({
        fullName: schoolFullName,
        city,
        town,
        schoolName,
        schoolType,
        lat,
        lon,
        website,
      });
    } catch (err) {
      console.log(`An error occured while fetching ${schoolFullName}`);
    }
  });

  if (pageId > Math.ceil(totalSchools / parseInt(process.env.MEB_SCHOOL_PER_PAGE, 10))) {
    return data;
  }

  return cityFetcher(plateId, pageId + 1, data);
};

module.exports = cityFetcher;
