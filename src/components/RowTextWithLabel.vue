<template>
    <template v-if="vertical">
        <div class="w-full flex flex-col gap-2">
            <div class="font-bold">
                <span
                    v-if="required"
                    class="text-negative"
                >*
                </span>
                {{ leftPart }}
                <!--<span-->
                <!--    v-if="required"-->
                <!--    class="text-negative"-->
                <!--&gt;*-->
                <!--</span>-->
                <slot name="left">{{ (emptyLeftPart) ? '&nbsp;' : '' }}</slot>
            </div>
            <div class="w-full flex justify-between">
                <div
                    :style="{ 'color': (passport) ? '#ACACAC' : 'dark' }"
                    class="w-full"
                >
                    <pre v-if="originalText">{{ rightPart || '—' }}</pre>

                    <!-- style="max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"-->
                    <div v-else>
                        {{ (customRightPart) ? '' : rightPart || '—' }}
                        <slot name="right"></slot>
                    </div>
                </div>

                <div>
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
    </template>

    <template v-else>
        <div class="w-full flex gap-6">
            <div
                class="font-bold"
                style="padding-top: 8px;"
            >
                {{ leftPart }}
                <span
                    v-if="required"
                    class="text-negative"
                >*
                </span>
                <slot name="left">{{ (emptyLeftPart) ? '&nbsp;' : '' }}</slot>
            </div>

            <div
                :style="{ 'color': (passport) ? '#ACACAC' : 'dark' }"
                class="grow"
                style="padding-top: 8px;"
            >
                <pre v-if="originalText">{{ rightPart || '—' }}</pre>

                <!-- style="max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"-->
                <div v-else>
                    {{ (customRightPart) ? '' : rightPart || '—' }}
                    <slot name="right"></slot>
                </div>
            </div>

            <div>
                <slot name="actions"></slot>
            </div>
        </div>
    </template>

</template>

<script setup>
import { computed } from 'vue';

/**
 * PROPS и EMITS и EXPOSE
 */

const props = defineProps({
    activeQuestion:  { type: Boolean, default: false },
    customRightPart: { type: Boolean, default: false },
    emptyLeftPart:   { type: Boolean, default: false },
    formed:          { type: Boolean, default: false },
    largeScreens:    { type: [ String, Number ], default: '4' },
    leftPart:        { type: String, default: '' },
    originalText:    { type: Boolean, default: false },
    questionText:    { type: String, default: '' },
    required:        { type: Boolean, default: false },
    rightPart:       { type: [ String, Number ], default: null },
    vertical:        { type: Boolean, default: false },
    passport:        { type: Boolean, default: false },
});

const largeScreensClasses = computed(() => {
    const rowClass = (props.formed) ? 'row-text__left--formed' : 'row-text__left';
    return `col-lg-${ props.largeScreens } col-md-${ props.largeScreens } ${ rowClass }`;
});

const rowOrColumn = computed(() => {
    return {
        'row':    !props.vertical,
        'column': props.vertical,
    };
});

const generateClassesParent = computed(() => {
    return {
        'flex-row': !props.vertical,
        'flex-col': props.vertical,
    };
});
</script>

<style lang="scss">

</style>
