import { useInView as useInViewLib } from 'react-intersection-observer'

export function useInView(options = {}) {
  return useInViewLib({
    threshold: 0.15,
    triggerOnce: true,
    ...options,
  })
}
