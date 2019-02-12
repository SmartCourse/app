<template>
    <div>
        <section class="text">
            <h1>Text</h1>
            <p> Text tags should be used semantically, with root-font specification.
                Do not confuse the use of a &lt;p&gt; or &lt;h1&gt; with the style of the body.
            </p>
            <h1 style="font: var(--header-1);">With font: --header-1</h1>
            <h2 style="font: var(--header-2);">With font: --header-2</h2>
            <h3 style="font: var(--header-3);">With font: --header-3</h3>
            <h4 style="font: var(--header-4);">With font: --header-4</h4>
            <p style="font: var(--body-copy-1);">With font: --body-1</p>
            <p style="font: var(--body-copy-2);">With font: --body-2</p>
            <hr>
            <div>
                <h2 style="font: var(--header-2);">Header (header-2)</h2>
                <h2 style="font: var(--header-3);">SubHeader (header-3)</h2>
                <p style="font: var(--body-copy-1);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </section>
        <section class="dark">
            <h1>Text (dark bg)</h1>
            <p> As above but with contrasted background.
            </p>
            <h1 style="font: var(--header-1);">With font: --header-1</h1>
            <h2 style="font: var(--header-2);">With font: --header-2</h2>
            <h3 style="font: var(--header-3);">With font: --header-3</h3>
            <h4 style="font: var(--header-4);">With font: --header-4</h4>
            <p style="font: var(--body-copy-1);">With font: --body-1</p>
            <p style="font: var(--body-copy-2);">With font: --body-2</p>
            <hr>
            <div>
                <h2 style="font: var(--header-2);">Header (header-2)</h2>
                <h2 style="font: var(--header-3);">SubHeader (header-3)</h2>
                <p style="font: var(--body-copy-1);">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </section>
        <section class="meta">
            <h1>Meta Elements</h1>
            <p>
                Other standard reusable components, spinners, buttons.
            </p>
            <LoadingSpinner/>
            <hr>
            <div>
                <AppButton>Submit</AppButton>
                <AppButton :alt="false">Cancel</AppButton>
                <QuestionCard
                    :vote="{ upvote: () => {}, downvote: () => {}, likes: 10 }"
                    :title="'This is a standard length title'"
                    :body="'This is a longer body, that includes a lot more words than the title, but isn\'t too long!'"
                    :published="'10 days'"
                    :user="{ userID: 1, name: 'Alex Hinds', degree: 'B. Arts', reputation: 10 }"
                />
                <AppRatingCircle :value="20"/>
                <app-rating-bar :value="20"/>
            </div>
        </section>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import QuestionCard from '@/components/Card/Large'
import AppRatingCircle from '@/components/AppRating/Circle'
import AppRatingBar from '@/components/AppRating/Bar'

export default {
  components: { AppButton, QuestionCard, AppRatingCircle, AppRatingBar }
}
</script>

<style scoped>
    section {
        padding: 20px;
        margin: 40px auto;
        max-width: 700px;
    }

    section:first-of-type {
        padding-top: 0;
    }

    .dark {
        background-color: var(--black);
        color: var(--white);
    }

    .dark p {
        color: var(--soft-white);
    }

</style>
