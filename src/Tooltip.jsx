import React, { PropTypes } from 'react';
import { placements } from './placements';
import Trigger from 'rc-trigger';

const Tooltip = React.createClass({
  propTypes: {
    trigger: PropTypes.any,
    children: PropTypes.any,
    defaultVisible: PropTypes.bool,
    visible: PropTypes.bool,
    placement: PropTypes.string,
    transitionName: PropTypes.string,
    animation: PropTypes.any,
    onVisibleChange: PropTypes.func,
    afterVisibleChange: PropTypes.func,
    overlay: PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.func,
    ]).isRequired,
    overlayStyle: PropTypes.object,
    overlayClassName: PropTypes.string,
    prefixCls: PropTypes.string,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    getTooltipContainer: PropTypes.func,
    destroyTooltipOnHide: PropTypes.bool,
    align: PropTypes.object,
    arrowContent: PropTypes.any,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-tooltip',
      mouseEnterDelay: 0,
      destroyTooltipOnHide: false,
      mouseLeaveDelay: 0.1,
      align: {},
      placement: 'right',
      trigger: ['hover'],
      arrowContent: null,
    };
  },

  getPopupElement() {
    const { arrowContent, overlay, prefixCls } = this.props;
    return ([
      <div className={`${prefixCls}-arrow`} key="arrow">
        {arrowContent}
      </div>,
      <div className={`${prefixCls}-inner`} key="content">
        {typeof overlay === 'function' ? overlay() : overlay}
      </div>,
    ]);
  },

  getPopupDomNode() {
    return this.refs.trigger.getPopupDomNode();
  },

  render() {
    const {
      overlayClassName, trigger,
      mouseEnterDelay, mouseLeaveDelay,
      overlayStyle, prefixCls,
      children, onVisibleChange,
      transitionName, animation,
      placement, align,
      destroyTooltipOnHide,
      defaultVisible, getTooltipContainer,
      ...extraProps,
    } = this.props;
    if ('visible' in this.props) {
      extraProps.popupVisible = this.props.visible;
    }
    return (<Trigger
      popupClassName={overlayClassName}
      ref="trigger"
      prefixCls={prefixCls}
      popup={this.getPopupElement}
      action={trigger}
      builtinPlacements={placements}
      popupPlacement={placement}
      popupAlign={align}
      getPopupContainer={getTooltipContainer}
      onPopupVisibleChange={onVisibleChange}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      defaultPopupVisible={defaultVisible}
      destroyPopupOnHide={destroyTooltipOnHide}
      mouseLeaveDelay={mouseLeaveDelay}
      popupStyle={overlayStyle}
      mouseEnterDelay={mouseEnterDelay}
      {...extraProps}
    >
      {children}
    </Trigger>);
  },
});

export default Tooltip;
