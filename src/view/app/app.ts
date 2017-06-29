require('./app.less')

import { h, Component, ConnectParams, RenderParams, Node, VNode } from 'kaiju'
import { update } from 'space-lift'

import { routes, RouteDef, Router, Route } from 'router'
import createAppStore, { AppStore } from 'store/appStore'
import Link from 'widget/link'
import Index from 'view/index'
import User from 'view/user'
import NotFound from 'view/app/routeNotFound'


export default function route() {
  return RouteDef('', {}, {
    enter: router => (route, child) => app({ appStore: createAppStore(), child, router, route }),
    children: {
      index: Index(),
      user: User(),
      notFound: NotFound()
    }
  })
}

function app(props: Props) {
  return Component<Props, State>({ name: 'app', props, initState, connect, render })
}

type Props = {
  appStore: AppStore
  router: Router
  route: Route<{}>
  child: VNode
}

type State = {
  count: number
}

function initState() {
  return {} as State
}


function connect({ on, props }: ConnectParams<Props, State>) {
  const store = props().appStore

  on(store.state, (state, appState) => {
    const { count } = appState
    return update(state, { count })
  })
}

function render({ props, state }: RenderParams<Props, State>): Node[] {
  const { router, route, child } = props

  return [
    h('header', [
      h('div', [
        Link({
          router,
          route: routes.index,
          label: 'Index',
          isActive: route.isIn(routes.index)
        }),
        Link({
          router,
          route: routes.user,
          params: { id: '33' },
          label: 'User',
          isActive: route.isIn(routes.user)
        }),
      ]),
      h('div', [
        h('span', { onClick: () => console.log('ok') },` | counts = ${ String(state.count) }`)
      ]),
    ]),
    h('div', child)
  ]
}
