export default function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
      <rect
        fill='#1CA8FF'
        stroke='#1CA8FF'
        stroke-width='2'
        width='5'
        height='5'
        x='25'
        y='85'
      >
        <animate
          attributeName='opacity'
          calcMode='spline'
          dur='2'
          values='1;0;1;'
          keySplines='.5 0 .5 1;.5 0 .5 1'
          repeatCount='indefinite'
          begin='-.4'
        ></animate>
      </rect>
      <rect
        fill='#1CA8FF'
        stroke='#1CA8FF'
        stroke-width='2'
        width='5'
        height='5'
        x='85'
        y='85'
      >
        <animate
          attributeName='opacity'
          calcMode='spline'
          dur='2'
          values='1;0;1;'
          keySplines='.5 0 .5 1;.5 0 .5 1'
          repeatCount='indefinite'
          begin='-.2'
        ></animate>
      </rect>
      <rect
        fill='#1CA8FF'
        stroke='#1CA8FF'
        stroke-width='2'
        width='5'
        height='5'
        x='145'
        y='85'
      >
        <animate
          attributeName='opacity'
          calcMode='spline'
          dur='2'
          values='1;0;1;'
          keySplines='.5 0 .5 1;.5 0 .5 1'
          repeatCount='indefinite'
          begin='0'
        ></animate>
      </rect>
    </svg>
  );
}
