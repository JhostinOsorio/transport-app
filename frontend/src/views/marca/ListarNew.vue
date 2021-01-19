<template>
    <b-card>
        <!-- <b-form-input id="search" v-model="searchTerm"></b-form-input> -->
        <input type="text" v-model="searchTerm">
        <!-- <b-button variant="outline-primary" @click="clear">Clear</b-button> -->
        <vue-good-table
            mode="remote"
            @on-page-change="onPageChange"
            @on-sort-change="onSortChange"
            @on-column-filter="onColumnFilter"
            @on-per-page-change="onPerPageChange"
            :totalRows="totalRecords"
            :search-options="{
                enabled: true,
                externalQuery: searchTerm
            }"
            @on-search="onColumnFilter"
            :pagination-options="{
                enabled: true,
            }"
            :columns="columns"
            :rows="rows"/>
    </b-card>
</template>
<script>
import { BCard, BFormInput, BButton } from "bootstrap-vue";
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
export default {
    name: 'ListarNew',
    components: {
        BCard,
        BFormInput,
        BButton,
        VueGoodTable,
    },
    data() {
        return {
            searchTerm: '',
            isLoading: false,
            columns: [
                {
                    label: 'Name',
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
            totalRecords: 0,
            serverParams: {
                // a map of column filters example: {name: 'john', age: '20'}
                columnFilters: {
                    name: '',
                },
                sort: {
                    field: '', // example: 'name'
                    type: '' // 'asc' or 'desc'
                }
                ,
                page: 1, // what page I want to show
                perPage: 10 // how many items I'm showing per page
            },
        }
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        updateParams(newProps) {
            this.serverParams = Object.assign({}, this.serverParams, newProps);
        },

        onPageChange(params) {
            this.updateParams({page: params.currentPage});
            this.loadItems();
        },
        clear() {
            this.searchTerm = ''
        },
        onPerPageChange(params) {
            this.updateParams({perPage: params.currentPerPage});
            this.loadItems();
        },

        onSortChange(params) {
            this.updateParams({
                sort: {
                    type: params[0].type,
                    field: params[0].field,
                }
            });
            this.loadItems();
        },

        onColumnFilter(params) {
            this.updateParams({
                columnFilters: {
                    name: params.searchTerm
                }
            });
            this.loadItems();
        },

        // load items is what brings back the rows from server
        loadItems() {
            // getFromServer(this.serverParams).then(response => {
            //     this.totalRecords = response.totalRecords;
            //     this.rows = response.rows;
            // });
            this.$http.post('/api/auth/marcas', this.serverParams)
                .then(response => {
                    this.totalRecords = response.data.totalRecords;
                    this.rows = response.data.rows;       
                    console.log(response)
                })
        }
    },
}
</script>
<style>

</style>