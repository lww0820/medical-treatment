import cpNavBar from '@/composable/cp-nav-bar.vue'
import cpIcon from '@/components/cp-icon.vue'
export declare module 'vue' {
  interface golbalComponents {
    vanNavBar: typeof cpNavBar
    cpIcon: typeof cpIcon
  }
}
