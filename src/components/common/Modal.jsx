import React from 'react'
import './Modal.css'
import {useSpring, animated, useTransition} from "@react-spring/web"

function Modal({children, isOpen, onClose}) {
    const modalTransition = useTransition(isOpen, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 1},
        config: { 
            duration: 300
        },
    })

    const spring = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 300,
        }, 
    })
  return modalTransition((styles, isOpen) => isOpen &&(
    <animated.div style={styles} className="react-modal-overlay">
        <animated.div style={spring} className="react-modal-wrapper" onClick={e => e.stopPropagation()}>
            <div className="react-modal-content">
                {children}
                <button type="button" onClick={onClose}>
                    Keluar
                </button>
            </div>
        </animated.div>
    </animated.div>
  ))
}

export default Modal