<template>
    <div>
        <select v-model="selectedCurrency" @change="changeCurrency">
            <option
                v-for="(rate, currency) in rates"
                :key="currency"
                :value="currency">
                {{ currency }}
            </option>
        </select>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    data() {
        return {
            selectedCurrency: this.baseCurrency,
        };
    },
    computed: {
        ...mapState("currency", ["rates", "baseCurrency"]),
    },
    methods: {
        ...mapActions("currency", ["changeBaseCurrency"]),
        changeCurrency() {
            this.changeBaseCurrency(this.selectedCurrency);
        },
    },
    created() {
        this.changeBaseCurrency(this.baseCurrency);
    },
};
</script>
