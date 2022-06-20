import GeneralUtil from '../../utils/GeneralUtil';

class ButtonUtil {
  static _style(props, hover) {
    let style = GeneralUtil.responsiveObj(props.style);
    switch (props.shape) {
      case 'bordered':
        return ButtonUtil._bordered(props, style, hover);
      case 'solid':
        return ButtonUtil._solid(props, style);
      default:
        return style;
    }
  }

  static _bordered(props, style, hover) {
    if (!hover || !props.hover) {
      return {
        ...style,
        ...{ borderColor: props.primaryColor, color: props.primaryColor },
      };
    }
    if (hover && props.hover) {
      return {
        ...style,
        ...{
          borderColor: 'transparent',
          backgroundColor: props.primaryColor,
          color: props.secondaryColor,
        },
      };
    }
  }

  static _solid(props, style) {
    return {
      ...style,
      ...{
        borderColor: props.primaryColor,
        backgroundColor: props.primaryColor,
        color: props.secondaryColor,
      },
    };
  }
}

export default ButtonUtil;
