import styled from 'styled-components'

const Loader = styled.span`
  @keyframes fade {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .loader {
    vertical-align: middle;
    position: relative;
    fill: #ffffff;
    border-radius: 100%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    width: 24px;
    height: 24px;
    .loader-1 {
      animation-delay: 0.1s;
    }
    .loader-2 {
      animation-delay: 0.2s;
    }
    .loader-3 {
      animation-delay: 0.3s;
    }
    .loader-4 {
      animation-delay: 0.4s;
    }
    .loader-5 {
      animation-delay: 0.5s;
    }
    .loader-6 {
      animation-delay: 0.6s;
    }
    .loader-7 {
      animation-delay: 0.7s;
    }
    .loader-8 {
      animation-delay: 0.8s;
    }
    .loader-9 {
      animation-delay: 0.9s;
    }
    .loader-10 {
      animation-delay: 1s;
    }
    .loader-11 {
      animation-delay: 1.1s;
    }
    rect {
      opacity: 0;
      animation: fade 1.2s ease infinite;
    }
  }
`

const BtnLoader = () => {
  return (
    <Loader>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' className='loader'>
        <path fill='none' className='bk' d='M0 0h100v100H0z' />
        <rect x='46.5' y='40' width='7' height='20' rx='3' ry='3' className='loader-0' transform='translate(0 -30)' />
        <rect
          x='46.5'
          y='40'
          width='7'
          height='20'
          rx='3'
          ry='3'
          className='loader-1'
          transform='rotate(30 105.98 65)'
        />
        <rect
          x='46.5'
          y='40'
          width='7'
          height='20'
          rx='3'
          ry='3'
          className='loader-2'
          transform='rotate(60 75.98 65)'
        />
        <rect x='46.5' y='40' width='7' height='20' rx='3' ry='3' className='loader-3' transform='rotate(90 65 65)' />
        <rect
          x='46.5'
          y='40'
          width='7'
          height='20'
          rx='3'
          ry='3'
          className='loader-4'
          transform='rotate(120 58.66 65)'
        />
        <rect
          x='46.5'
          y='40'
          width='7'
          height='20'
          rx='3'
          ry='3'
          className='loader-5'
          transform='rotate(150 54.02 65)'
        />
        <rect x='46.5' y='40' width='7' height='20' rx='3' ry='3' className='loader-6' transform='rotate(180 50 65)' />
        <rect
          x='46.5'
          y='40'
          width='7'
          height='20'
          rx='3'
          ry='3'
          className='loader-7'
          transform='rotate(-150 45.98 65)'
        />
        <rect
          x='46.5'
          y='40'
          width='7'
          height='20'
          rx='3'
          ry='3'
          className='loader-8'
          transform='rotate(-120 41.34 65)'
        />
        <rect x='46.5' y='40' width='7' height='20' rx='3' ry='3' className='loader-9' transform='rotate(-90 35 65)' />
        <rect
          x='46.5'
          y='40'
          width='7'
          height='20'
          rx='3'
          ry='3'
          className='loader-10'
          transform='rotate(-60 24.02 65)'
        />
        <rect
          x='46.5'
          y='40'
          width='7'
          height='20'
          rx='3'
          ry='3'
          className='loader-11'
          transform='rotate(-30 -5.98 65)'
        />
      </svg>
    </Loader>
  )
}
export default BtnLoader
