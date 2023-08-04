import aquarius from './images/aquarius.png';
import aries from './images/aries.png';
import cancer from './images/cancer.png';
import capricorn from './images/capricorn.png';
import gemini from './images/gemini.png';
import leo from './images/leo.png';
import libra from './images/libra.png';
import pisces from './images/pisces.png';
import sagittarius from './images/sagittarius.png'
import scorpio from './images/scorpio.png'
import taurus from './images/taurus.png'
import virgo from './images/virgo.png'

const getZodiacIcon = (sign) => {
  const replacements = {
    aquarius,
    aries,
    cancer,
    capricorn,
    gemini,
    leo,
    libra,
    pisces,
    sagittarius,
    scorpio,
    taurus,
    virgo
  }
  return replacements[sign]
}

export {getZodiacIcon}