
const Loading = ({className}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            style={{ shapeRendering: 'auto', display: 'block' }}
            className={className}
        >
            <g>
                <circle strokeWidth="2" stroke="#d67824" fill="none" r="0" cy="50" cx="50">
                    <animate
                        begin="0s"
                        calcMode="spline"
                        keySplines="0 0.2 0.8 1"
                        keyTimes="0;1"
                        values="0;40"
                        dur="1.639s"
                        repeatCount="indefinite"
                        attributeName="r"
                    />
                    <animate
                        begin="0s"
                        calcMode="spline"
                        keySplines="0.2 0 0.8 1"
                        keyTimes="0;1"
                        values="1;0"
                        dur="1.639s"
                        repeatCount="indefinite"
                        attributeName="opacity"
                    />
                </circle>
                <circle strokeWidth="2" stroke="#cb962a" fill="none" r="0" cy="50" cx="50">
                    <animate
                        begin="-0.82s"
                        calcMode="spline"
                        keySplines="0 0.2 0.8 1"
                        keyTimes="0;1"
                        values="0;40"
                        dur="1.639s"
                        repeatCount="indefinite"
                        attributeName="r"
                    />
                    <animate
                        begin="-0.82s"
                        calcMode="spline"
                        keySplines="0.2 0 0.8 1"
                        keyTimes="0;1"
                        values="1;0"
                        dur="1.639s"
                        repeatCount="indefinite"
                        attributeName="opacity"
                    />
                </circle>
            </g>
        </svg>
    )
}

export default Loading;