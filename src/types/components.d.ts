import cpNavBar from '@/composable/cp-nav-bar.vue'
import cpIcon from '@/components/cp-icon.vue'
import cpRadioBtn from '@/components/cp-radio-btn.vue'
import ConsultMore from '@/views/User/components/ConsultMore.vue'
export declare module 'vue' {
  interface golbalComponents {
    vanNavBar: typeof cpNavBar
    cpIcon: typeof cpIcon
    cpRadioBtn: typeof cpRadioBtn
    ConsultMore: typeof ConsultMore
  }
}
