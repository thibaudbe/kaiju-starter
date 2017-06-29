require('./user.less')
import { h, Component, ConnectParams, RenderParams, VNode } from 'kaiju'
import { RouteDef, Router, Route } from 'router'
import appStore, { incrementCounter } from 'store/appStore'
// import { update } from 'space-lift'

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
  return Component<Props, State>({ name: 'user', props, initState, connect, render })
}

interface State {
  count: number
}

function initState(): State {
  return {
    count: undefined!
  }
}

function connect({ on, msg }: ConnectParams<Props, State>) {

  on(msg.listen(incrementCounter), _ => appStore().send(incrementCounter()))
}

function render({}: RenderParams<Props, State>): VNode {

  return h('div', [
    h('h1', 'User'),
    h('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
    // Button({
    //   className: styles.incrementButton,
    //   label: 'increment',
    //   events: { mousedown: incrementCounter }
    // }),
  ])

}
