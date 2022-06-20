class TextUtil {
  static importFont(font) {
    if (document.getElementById(font.id)) return;
    const style = document.createElement('style');
    style.id = font.id;
    document.body.appendChild(style);
    document
      .getElementById(font.id)
      .appendChild(document.createTextNode('@import url("' + font.url + '");'));
  }
}

export default TextUtil;
