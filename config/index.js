import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';
import axios from 'axios';

function annotateSpeech(annotations) {
  let manipulatedHtml = speechBody.html;
  annotations.forEach((annotation) => {
    manipulatedHtml = manipulatedHtml.replace(annotation.match, `<mark class="annotation-highlight">${annotation.match}</mark>`)
  });

  return manipulatedHtml;
}

export default async function() {
  const d = await article();
  const flags = await getFlags();
  const onwardJourney = await getOnwardJourney();

  let intro;
  let headline;
  let summary;
  let title;
  let description;
  let speech;
  let socialImage;
  let socialHeadline;
  let tweetText;
  let twitterHeadline;
  let facebookHeadline;

  const berthaId = '1CcDeL0nHpXlnAeGn2a8iNAmDK-Hw9yn1y6HPxv9nues';
  const endpoint = `http://bertha.ig.ft.com/view/publish/gss/${berthaId}/speech,pageText`;
  try {
    const res = await axios(endpoint);
    const pageText = res.data.pageText;
    intro = pageText.filter((d) => d.key === 'introText')[0].value;
    headline = pageText.filter((d) => d.key === 'headline')[0].value;
    summary = pageText.filter((d) => d.key === 'standfirst')[0].value;
    title = headline;
    description = summary;
    speech = res.data.speech[0].text;

    socialImage = pageText.filter((d) => d.key === 'socialImage')[0].value;
    socialHeadline = pageText.filter((d) => d.key === 'socialHeadline')[0].value;
    tweetText = pageText.filter((d) => d.key === 'tweetText')[0].value;
    twitterHeadline = pageText.filter((d) => d.key === 'twitterHeadline')[0].value;
    facebookHeadline = pageText.filter((d) => d.key === 'facebookHeadline')[0].value;
  } catch (e) {
    console.log('Error getting content from Bertha', e);
  }

  return {
    ...d,
    berthaId,
    intro,
    headline,
    summary,
    title,
    description,
    speech,
    socialImage,
    socialHeadline,
    tweetText,
    twitterHeadline,
    facebookHeadline,
    flags,
    onwardJourney,
  };
}
