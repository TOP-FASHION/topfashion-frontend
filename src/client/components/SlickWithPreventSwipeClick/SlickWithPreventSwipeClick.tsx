import * as React from 'react';
import classNames from 'classnames';
import Slick from 'react-slick';
import './SlickWithPreventSwipeClick.scss';

interface Props {
  children?: React.ReactNode;
  forwardRef?: any;
}

function SlickWithPreventSwipeClick({
  children,
  forwardRef,
  ...otherProps
}: Props) {
  let element: any;
  const [preventClick, setSreventClick] = React.useState(false);

  React.useEffect(() => {
    if (!element) {
      return;
    }
    element.addEventListener('mousedown', onMousedown);

    return function cleanup() {
      if (!element) {
        return;
      }
      element.removeEventListener('mousedown', onMousedown);
    };
  });

  const setRef = (ref: any) => {
    element = ref;
  };

  const onMousedown = (event: any) => {
    const downX = event.screenX;
    const downY = event.screenY;

    const onMousemove = (moveEvent: any) => {
      if (preventClick) {
        return;
      }

      const distance = Math.sqrt(
        Math.abs(downX - moveEvent.screenX) ** 2 +
          Math.abs(downY - moveEvent.screenY) ** 2
      );

      if (distance > 15) {
        setSreventClick(true);
      }
    };
    const onMouseup = () => {
      setSreventClick(false);

      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  };

  const classes = classNames('slick-prevent-click', {
    'slick-prevent-click--active': preventClick,
  });

  return (
    <div className={classes} onMouseDown={onMousedown} ref={setRef}>
      <Slick {...otherProps} ref={forwardRef}>
        {children}
      </Slick>
    </div>
  );
}

export default React.forwardRef((props, ref) => (
  <SlickWithPreventSwipeClick forwardRef={ref} {...props} />
));
