import PropTypes from 'prop-types';
import React from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate/velocity.ui';

const Animate = React.forwardRef((props, ref) => {
    const children = React.cloneElement(props.children, {
        style: {
            ...props.children.style,
            visibility: 'visible'
        }
    });
    return (
        <VelocityComponent ref={ref} {...props}>
            {children}
        </VelocityComponent>
    );
});

Animate.propTypes = {
    children: PropTypes.element.isRequired
};

Animate.defaultProps = {
    animation: 'transition.fadeIn',
    runOnMount: true,
    targetQuerySelector: null,
    interruptBehavior: 'stop',
    visibility: 'visible',
    duration: 300,
    delay: 50,
    easing: [0.4, 0.0, 0.2, 1],
    display: null,
    setRef: undefined
};

export default React.memo(Animate);
