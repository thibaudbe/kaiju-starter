require('./user.less')
import { h, Component, ConnectParams, RenderParams, VNode } from 'kaiju'
import { RouteDef, Router, Route } from 'router'
import appStore, { incrementCounter } from 'store/appStore'

type Params = { id: string }

type Props = {
  child: VNode
  router: Router
  route: Route<Params>
}

export default function route() {
  return RouteDef('user/:id', <Params>{}, {
    enter: (router) => {
      return (route, child) => user({ router, route, child })
    },
    children: {}
  })
}

function user(props: Props) {
  return Component<Props, {}>({ name: 'user', props, initState, connect, render })
}

function initState() {
  return {}
}

function connect({ on }: ConnectParams<Props, {}>) {
  on(incrementCounter, () => appStore.send(incrementCounter()))
}

function render({}: RenderParams<Props, {}>): VNode {

  return h('div', [
    h('h1', 'User'),
    h('button', {
      events: { mousedown: incrementCounter }
    }, 'increment'),
    h('span', 'User page'),
  ])

}
