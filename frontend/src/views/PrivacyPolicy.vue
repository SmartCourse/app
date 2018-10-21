<template>
    <section class="main-content">
        <AppArticle>
            <h1>Our Privacy Policy</h1>
            <p>The following defines SmartCourse's policy for how we collect, use and share information about you or any information used to whilst provided SmartCourse services.</p>
            <h2>Information Collection and use</h2>
            <p>
            We may collect and combine information that is provided by you when you interact with SmartCourse including:
            </p>
            <ul>
                <li>When you create an account with SmartCourse (Note: SmartCourse uses Google's Firebase for authentication)</li>
                <li>When you provide or update profile information, including any preferences that you set.</li>
                <li>When you post content to the site such as questions, reviews and comments including upvotes and downvotes on this content.</li>
                <li>When you otherwise interact with the site such as making queries or requests, viewing page, searching or viewing content on SmartCourse.</li>
            </ul>

            <h2>How we use this information</h2>
            <ul>
                <li>To provide, maintain, improve and develop relevent features, content and SmartCourse services.</li>
                <li>Understand how you use our Services.</li>
                <li>Fulfil your requests when authorised by you</li>
            </ul>

            <h2>How we share this information</h2>
            <p>
            We share information we have about you for the purposes described in this Privacy Policy, inlcuding to provide Services that you have requested (including when you conneect with third-party apps).
            We do not sell, license or share information that individually identifies our customers with companies, organisations or individuals outside of SmartCourse.
            </p>
            <h3>Public Information</h3>
            <p>
            Due to the nature of the site and the content of SmartCourse being user driven information may be shared publically and able to be viewed on the site by others.
            This information includes but is not limited to the following:
            </p>
            <ul>
                <li>Any Questions, Reviews or Comments posted to the site including upvotes and downvotes; Which will be able to be viewed by others.</li>
                <li>Profile information including your display name, join date, description and profile image.</li>
            </ul>

            <h3>With Universities</h3>

            <p>
                SmartCourse may provided anonymous and aggregated rating of courses as well as reviews supplied by users to universties.
            </p>

            <h3>Google's Firebase</h3>
            <p>
                SmartCourse uses Google's Firebase service to provide user management and authentication. To use this service SmartCourse will require providing some information to this service.
            The information provided includes a display name, password and email provided by you upon signup with SmartCourse.
            </p>

            <h2>Changes</h2>
            <p>
            We may update this Privacy Policy from time to time, so you should check it periodically.
            </p>
        </AppArticle>
    </section>
</template>

<script>

import AppArticle from '@/components/AppArticle'

export default {
  name: 'privacy-policy',
  components: { AppArticle }
}

</script>

<style scoped>
ul { margin: 16px; }
li { list-style: disc; }
</style>
