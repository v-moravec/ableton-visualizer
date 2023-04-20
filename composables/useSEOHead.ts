interface SEOInformation {
  title: string,
  description: string,
  ogImage?: string
}

export default ({title, description, ogImage = ''}: SEOInformation) => {
  // TODO: Change to desired url.
  const url = 'https://av.vojtamoravec.cz'
  useHead({
    title,
    meta: [
      { name: 'title', content: title},
      { name: 'description', content: description},
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:image', content: url + '/og-image/' + ogImage },
    ]
  })
}
