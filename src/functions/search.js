const axios = require('axios')
const cheerio = require('cheerio')

async function search(query) {
    const results = []
    const url = 'https://store.steampowered.com/search/?term=' + query
    let html = ''

    try {
        html = await axios.get(url);
    } catch {
        return results;
    }

    const $ = cheerio.load(html.data)

    $('div#search_resultsRows > a').each((_, element) => {
        const title = $(element).find('.title').text().trim()
        const titleId = $(element).attr('data-ds-appid')
        const titleLink = $(element).attr('href')
        const coverImage = $(element).find('.search_capsule img').attr('srcset')?.split(', ')[1].split(' ')[0]
        let platforms = []
        const releaseDate = $(element).find('.search_released').text().trim()
        const price = $(element).find('.discount_final_price').text().trim()

        $(element).find('.platform_img').each((_, el) => {
            const platformClass = $(el).attr('class')
            const platform = platformClass.replace('platform_img ', '')
        
            platforms.push(platform)
        })

        const gameData = {
            title,
            titleId,
            titleLink,
            coverImage,
            platforms,
            releaseDate,
            price
        };

        results.push(gameData)
    });

    return results
}

module.exports = search
