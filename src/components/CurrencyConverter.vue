<template>
    <div>
        <h3>Döviz Kuru Hesaplama</h3>
        <input v-model="amount" type="number" placeholder="Miktar" />
        <select v-model="currency">
            <option v-for="(rate, key) in rates" :key="key" :value="key">
                {{ key }}
            </option>
        </select>
        <p>{{ amount }} USD = {{ convertedAmount }} {{ currency }}</p>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            amount: 1,
            currency: "USD",
        };
    },
    computed: {
        ...mapState("currency", ["rates"]),
        convertedAmount() {
            return (this.amount * this.rates[this.currency]).toFixed(2);
        },
    },
    mounted() {
        this.$store.dispatch("currency/fetchRates");
    },
};
</script>
