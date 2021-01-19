<template>
  <b-card-code title="Basic Table">
    <!-- table -->
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="rows"
      :globalSearch="true"
      :rtl="direction"
      :search-options="{
        enabled: true,
        skipDiacritics: true }"
      @on-search="onSearch"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Name -->
        <span
          v-if="props.column.field === 'name'"
          class="text-nowrap"
        >
          {{(marks.per_page * (marks.current_page - 1)) + (props.index + 1)}}
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'

export default {
  components: {
    BCardCode,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
      marks: {
          searchTerm: '',
          total: 0,
          per_page: 5,
          from: 1,
          to: 0,
          current_page: 1
      },
      offset: 4,
      columns: [
        {
          label: 'Nombre',
          field: 'name',
        },
        {
          label: 'Creado en',
          field: 'created_at',
        },
        {
          label: 'Actualizado en',
          field: 'updated_at',
        },
      ],
      rows: [],
    }
  },
  mounted() {
    this.getRecords()
  },
  methods: {
    getRecords() {
        return this.$http.get(`api/auth/marcas?searchTerm=${this.marks.searchTerm}`).then((response) => {
          console.clear()
          console.log(response.data)
            this.rows = response.data.marks
            // this.marks = response.data
        })
    },
    updateParams(newProps) {
        this.marks = Object.assign({}, this.marks, newProps);
    },
    onSearch: _.debounce(function (params) {
        this.updateParams(params);
        this.getRecords();
        return false;
    }, 500)
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  }
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>