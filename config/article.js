export default () => ({ // eslint-disable-line

  // link file UUID
  id: '1888b166-13b9-11e7-80f4-13e067d5072c',

  // canonical URL of the published page
  // https://ig.ft.com/sites/federal-reserve-march-meeting-2017 get filled in by the ./configure script
  url: 'https://ig.ft.com/article-50-annotated',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date(),

  headline: 'Theresa May’s Article 50 letter decoded',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'The UK government’s full Brexit letter with FT correspondents’ notes and comments',

  topic: {
    name: 'Brexit',
    url: 'https://www.ft.com/topics/themes/Brexit',
  },

  relatedArticle: {
    text: '',
    url: '',
  },

  mainImage: {
    title: '',
    description: '',
    url: '',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'George Parker', url: 'https://www.ft.com/stream/authorsId/Q0ItMDAwMDgzMA==-QXV0aG9ycw==' },
    { name: 'Alex Barker', url: 'https://www.ft.com/stream/authorsId/Q0ItMDAwMDY3Mg==-QXV0aG9ycw==' },
    { name: 'Martin Stabe', url: 'https://www.ft.com/martin-stabe' },
  ],

  // Appears in the HTML <title>
  title: 'Article 50 letter decoded',

  // meta data
  description: 'The full Brexit notification with comments from the FT',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
 socialImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F71231d3a-13c7-11e7-b0c1-37e417ee6c76?source=ig&fit=scale-down&width=1200',
  // socialHeadline: '',
  // socialSummary: 'The UK's Article 50 notification letter, annotated',

  // TWITTER
twitterImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F71231d3a-13c7-11e7-b0c1-37e417ee6c76?source=ig&fit=scale-down&width=1800',
twitterCreator: '@ft',
tweetText:  'The full Brexit notification with comments from the FT',
twitterHeadline:  'The UK\'s Article 50 notification letter, annotated',

  // FACEBOOK
 facebookImage: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2F71231d3a-13c7-11e7-b0c1-37e417ee6c76?source=ig&fit=scale-down&width=1800',
 facebookHeadline: 'The UK\'s Article 50 notification letter, annotated',

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
