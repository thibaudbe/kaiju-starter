const styles = require('./link.less')

import { h } from 'kaiju'

import { Router, RouteDef } from 'router'


interface LinkProps<P> {
  router: Router
  route: RouteDef<P, {}>
  isActive?: boolean
  params?: P
  label: string
}

export default function link<P>({ router, route, params, label, isActive = false }: LinkProps<P>) {
  const href = router.link(route, params)

  return (
    h('a', {
      class: { [styles.link]: true, [styles.active]: isActive },
      attrs: { href, 'data-nav': 'mousedown' }
    }, label)
  )
}