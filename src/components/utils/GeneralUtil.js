class GeneralUtil {
  static generateId(string) {
    return string + '_' + Math.floor(Math.random() * 100000000000000000000);
  }

  static extractFileName(src) {
    return src
      ? src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))
      : '';
  }

  static mediaMatch(pixels) {
    return window.matchMedia('(max-width: ' + pixels + 'px)').matches;
  }

  static isDefined(obj) {
    return obj !== null && obj !== undefined;
  }

  static isResponsiveUnitExist(unitName, unitSize, obj) {
    return (
      GeneralUtil.mediaMatch(unitSize) &&
      GeneralUtil.isDefined(obj) &&
      GeneralUtil.isDefined(obj[unitName])
    );
  }

  static responsiveObj(obj) {
    if (GeneralUtil.isResponsiveUnitExist('xs', 767, obj)) return obj.xs;
    if (GeneralUtil.isResponsiveUnitExist('sm', 992, obj)) return obj.sm;
    if (GeneralUtil.isResponsiveUnitExist('md', 1199, obj)) return obj.md;
    if (GeneralUtil.isResponsiveUnitExist('lg', 8000, obj)) return obj.lg;
    return obj;
  }
}

export default GeneralUtil;
