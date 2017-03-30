import MarkdownIt from 'markdown-it';

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


class Annotation {
  constructor(rootElement, options) {
    this.rootElement = rootElement;
    this.options = this.defaultOptions(options);
    this.highlightAttribute = 'data-highlight';
    this.highlightElements;
    this.annotations;
    this.selectedHighlight;

    // get rid of smart quotes — to fix matching bug
    this.rootElement.innerHTML = this.rootElement.innerHTML.replace(/‘/g, "'").replace(/’/g, "'").replace(/“/g, "\"").replace(/”/g, "\"");

    this.getAnnotations();
    this.appendAnnotation();
  }

  static init(rootElement, options = {}) {
    if (!rootElement) {
      rootElement = document.querySelectorAll('[data-annotation-text]');
    } else if (!(rootElement instanceof HTMLElement)) {
      rootElement = document.querySelectorAll(rootElement);
    }

    if (rootElement instanceof HTMLElement) {
      new Annotation(rootElement, options);
    } else {
      [].forEach.call(rootElement, (element) => {
        new Annotation(element, options);
      });
    }
  }

  defaultOptions(options) {
    return {
      annotationsId: options.annotationsId || this.rootElement.getAttribute('data-annotation-id'),
      minWidth: options.minWidth || null,
      maxWidth: options.maxWidth || null,
      gutter: options.gutter || null,
    };
  }

  bindListeners() {
    const eventHandler = (event) => {
      if (event.type === 'click' || (event.type === 'click' && event.keyCode === 13)) {
        if (this.selectedHighlight && this.selectedHighlight === event.target) {
          this.annotationModal.innerHTML = '';
          this.selectedHighlight.setAttribute('aria-expanded', 'false');
          this.selectedHighlight = null;
          if (typeof (ga) !== 'undefined') {
            ga('send', {
              hitType: 'event',
              eventCategory: 'Annotation Highlight',
              eventAction: 'Close',
              eventLabel: 'Trump Speech',
            });
          }
        } else {
          this.openAnnotation(event.target);
          if (this.selectedHighlight) {
            this.selectedHighlight.setAttribute('aria-expanded', 'false');
          }
          this.selectedHighlight = event.target;
          this.selectedHighlight.setAttribute('aria-expanded', 'true');
          if (typeof (ga) !== 'undefined') {
            ga('send', {
              hitType: 'event',
              eventCategory: 'Annotation Highlight',
              eventAction: 'Open',
              eventLabel: 'Trump Speech',
            });
          }
        }
      }
    };

    [].forEach.call(this.highlightElements, (element) => {
      element.addEventListener('click', eventHandler);
      element.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
				  this.openAnnotation(event.target);
          if (this.selectedHighlight) {
            this.selectedHighlight.setAttribute('aria-expanded', 'false');
          }
          this.selectedHighlight = event.target;
          this.selectedHighlight.setAttribute('aria-expanded', 'true');
        }
      });
    });

    window.addEventListener('resize', debounce(() => {
      const width = this.calculateAnnotationWidth();

      if (width && this.selectedHighlight) {
        const annotationPosition = this.calculateAnnotationYPosition(this.selectedHighlight, this.annotationModal);
        this.annotationModal.classList.add('speech__annotation--absolute');
        this.annotationModal.style.width = `${this.calculateAnnotationWidth()}px`;
        this.annotationModal.style.top = `${annotationPosition.top}px`;
        this.annotationModal.style.left = `${annotationPosition.left}px`;
      } else {
        this.annotationModal.classList.remove('speech__annotation--absolute');
        this.annotationModal.style.width = '100%';
      }
		}, 250));
  }

  getAnnotations() {
    fetch(`https://bertha.ig.ft.com/view/publish/gss/${this.options.annotationsId}/authors,annotations`)
  	.then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then(data => {
      this.annotations = data.annotations;
      this.addHighlighting();
      this.bindListeners();
  	}).catch(error => {
    		console.error(error);
  	});
  }

  addHighlighting() {
  	this.annotations.forEach((annotation, index) => {
    if (this.elementContainingAnnotationMatcher(annotation.match) && annotation.annotation.md) {
      this.highlightMarkup(this.elementContainingAnnotationMatcher(annotation.match), annotation.match, index);
    }
  	});
    this.highlightElements = this.rootElement.querySelectorAll(`[${this.highlightAttribute}]`);
  }

  highlightMarkup(node, matcher, annotationIndex) {
    const highlight = document.createElement('mark');
    highlight.innerHTML = matcher;
    highlight.tabIndex = 0;
    highlight.classList.add('speech__highlight');
    highlight.setAttribute(this.highlightAttribute, annotationIndex);
    highlight.setAttribute('aria-expanded', 'false');
    highlight.setAttribute('aria-controls', 'annotation');
    highlight.setAttribute('role', 'button');

    node.innerHTML = node.innerHTML.replace(matcher, highlight.outerHTML);
  }

  elementContainingAnnotationMatcher(matcher) {
    for (let i = 0; i < this.rootElement.childNodes.length; i++) {
      if (this.rootElement.childNodes[i].textContent.includes(matcher)) {
    		return this.rootElement.childNodes[i];
        break;
  		}
    }
  }

  appendAnnotation() {
    const annotationWidth = this.calculateAnnotationWidth();
    this.annotationModal = document.createElement('aside');
    this.annotationModal.id = 'annotation';
    this.annotationModal.setAttribute('aria-hidden', true);
    this.annotationModal.setAttribute('aria-live', 'polite');
    this.annotationModal.classList.add('speech__annotation');

    if (annotationWidth) {
      this.annotationModal.classList.add('speech__annotation--absolute');
      this.annotationModal.style.width = `${annotationWidth}px`;
    }

    this.rootElement.appendChild(this.annotationModal);
  }

  openAnnotation(clickedElement) {
    const annotationIndex = clickedElement.getAttribute(this.highlightAttribute);
    this.annotationModal.innerHTML = this.generateAnnotationMarkup(this.annotations[annotationIndex]);

    this.annotationModal.style.top = `${this.calculateAnnotationYPosition(clickedElement, this.annotationModal).top}px`;


    this.annotationModal.style.left = `${this.calculateAnnotationYPosition(clickedElement, this.annotationModal).left}px`;

    this.annotationModal.style.visibility = 'visible';

    this.annotationModal.setAttribute('aria-hidden', false);

    clickedElement.parentNode.insertBefore(this.annotationModal, clickedElement.nextSibling);
  }

  generateAnnotationMarkup(data) {
    const md = new MarkdownIt();
    // console.log(data)
    let authorLink = data.author && data.authorlink ? `<a href="${data.authorlink}" rel="author" class="speech__annotation-byline">${data.author}</a>` : '';

    if (authorLink === '' && data.author) {
      authorLink = `<span class="speech__annotation-byline">${data.author}</span>`
    }

    return `${md.render(data.annotation.md)} ${authorLink}`;
  }

  calculateAnnotationWidth() {
    const spaceForAnnotation = (document.documentElement.clientWidth - (this.options.gutter + this.options.gutter / 2)) - (this.rootElement.getBoundingClientRect().left + this.rootElement.clientWidth);


    let width = spaceForAnnotation > this.options.minWidth ? spaceForAnnotation : 0;

    width = this.options.maxWidth && width > this.options.maxWidth ? this.options.maxWidth : width;

    return width;
  }
  calculateAnnotationYPosition(highlight, annotation) {
    if (highlight) {
      const topOfHighlight = highlight.offsetTop;
      const heightOfAnnotation = annotation.clientHeight;
      const bottomOfSpeech = this.rootElement.clientHeight + this.rootElement.offsetTop;
      const leftPosition = this.rootElement.clientWidth + this.options.gutter;

      return {
        top: topOfHighlight + heightOfAnnotation < bottomOfSpeech ? topOfHighlight : topOfHighlight - ((topOfHighlight + heightOfAnnotation) - bottomOfSpeech),
        left: leftPosition,
      };
    }
  }
}

export default Annotation;
