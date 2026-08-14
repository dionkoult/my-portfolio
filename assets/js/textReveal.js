document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typewriter');

const html = `<span class="comment">// UserCard.jsx</span>

<span class="blue">function</span> <span class="light-yellow">UserCard</span><span class="tense-yellow">(</span><span class="purple">{</span> <span class="light-blue">user</span> <span class="purple">}</span><span class="tense-yellow">)</span> <span class="tense-yellow">{</span>
  <span class="blue">const</span> <span class="purple">[</span><span class="tense-blue">liked</span>, <span class="tense-blue">setLiked</span><span class="purple">]</span> = <span class="light-yellow">useState</span><span class="purple">(</span><span class="blue">false</span><span class="purple">)</span>;

  <span class="purple">return</span> <span class="purple">(</span>
    <span class="gray">&lt;</span><span class="blue">div</span> <span class="light-blue">className</span>=<span class="string">"card"</span><span class="gray">&gt;</span>
      <span class="gray">&lt;</span><span class="blue">img</span> <span class="light-blue">src</span>=<span class="t2-blue">{</span><span class="light-blue">user</span>.<span class="light-blue">avatar</span><span class="t2-blue">}</span> <span class="light-blue">alt</span>=<span class="t2-blue">{</span><span class="light-blue">user</span>.<span class="light-blue">name</span><span class="t2-blue">}</span> <span class="gray">/&gt;</span>
      <span class="gray">&lt;</span><span class="blue">h3</span><span class="gray">&gt;</span><span class="t2-blue">{</span><span class="light-blue">user</span>.<span class="light-blue">name</span><span class="t2-blue">}</span><span class="gray">&lt;/</span><span class="blue">h3</span><span class="gray">&gt;</span>
      <span class="gray">&lt;</span><span class="blue">button</span> <span class="light-blue">onClick</span>=<span class="t2-blue">{</span><span class="tense-yellow">(</span><span class="tense-yellow">)</span> <span class="blue">=&gt;</span> <span class="light-yellow">setLiked</span><span class="tense-yellow">(</span>!<span class="tense-blue">liked</span><span class="tense-yellow">)</span><span class="t2-blue">}</span><span class="gray">&gt;</span>
        <span class="t2-blue">{</span><span class="tense-blue">liked</span> ? <span class="string">'❤️'</span> : <span class="string">'🤍'</span><span class="t2-blue">}</span>
      <span class="gray">&lt;/</span><span class="blue">button</span><span class="gray">&gt;</span>
    <span class="gray">&lt;/</span><span class="blue">div</span><span class="gray">&gt;</span>
  <span class="purple">)</span>;
<span class="tense-yellow">}</span>`;

  const temp = document.createElement('div');
  temp.innerHTML = html;
  const plainText = temp.textContent;
  const chars = plainText.length;
  let i = 0;
  let typing = false;

  function getVisibleHTML(upTo) {
    let count = 0;
    let result = '';
    let inTag = false;

    for (let j = 0; j < html.length; j++) {
      const ch = html[j];

      if (ch === '<') inTag = true;

      if (inTag) {
        result += ch;
        if (ch === '>') inTag = false;
      } else {
        if (count < upTo) {
          if (ch === '&') {
            const end = html.indexOf(';', j);
            result += html.slice(j, end + 1);
            j = end;
          } else {
            result += ch;
          }
          count++;
        } else {
          break;
        }
      }
    }

    return result;
  }

  function typeLetter() {
    if (i <= chars) {
      el.innerHTML = getVisibleHTML(i);
      i++;
      setTimeout(typeLetter, 50);
    } else {
      typing = false;
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !typing) {
        typing = true;
        typeLetter();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(el);
});