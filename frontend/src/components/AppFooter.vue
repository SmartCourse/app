<template>
    <footer id="footer">
       <section class="links">
        <div class="logo-container">
            <AppLogo/>
        </div>
        <ul class="navigation">
            <li class="links-header">Navigation</li>
            <router-link class="link" tag='li' :to="link.href" v-for="link in nav" :key="link.content">
                {{ link.content }}
            </router-link>
        </ul>
        <ul class="information">
            <li class="links-header">Information</li>
            <router-link class="link" tag='li' :to="link.href" v-for="link in info_internal" :key="link.content">
                {{ link.content }}
            </router-link>
            <li v-for="link in info_external" :key="link.content">
                <a :href ="link.href" class="link" >{{ link.content }}</a>
            </li>
        </ul>
        <ul class="UNSW">
            <li class="links-header">UNSW</li>
            <li v-for="link in unsw_external" :key="link.content">
                <a :href ="link.href" class="link" >{{ link.content }}</a>
            </li>
        </ul>
       </section>
      <p>Copyright &copy; SmartCourse 2018</p>
    </footer>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        { content: 'Home', href: '/' },
        { content: 'Subjects', href: '/subject' },
        { content: 'Profile', href: '/profile' }
      ],
      info_internal: [
        { content: 'Privacy Policy', href: '/privacy-policy' },
        { content: 'Terms of Use', href: '/terms-of-service' }
      ],
      info_external: [
        { content: 'Contribute', href: 'https://github.com/SmartCourse/app' }
      ],
      unsw_external: [
        { content: 'UNSW Handbook', href: 'https://www.handbook.unsw.edu.au/' },
        { content: 'UNSW Timetable', href: 'http://timetable.unsw.edu.au/' },
        { content: 'Class Utils', href: 'http://classutil.unsw.edu.au/' },
        { content: 'Bojangles', href: 'http://www.tdransfield.net/utilities/bojangles' }
      ]
    }
  }
}
</script>

<style scoped lang='less'>
#footer {
  color: var(--soft-white);
  width: 100%;
  background-color: var(--black);
  min-height: 50px;
}

.logo-container {
    color: var(--white);
}

.logo-container > h1 {
  margin: auto;
}

.links {
  padding: 40px 0;
  margin: 0 auto;
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: auto;
  grid-gap: 40px;
}

.links-header {
  color: var(--white);
  font-weight: bolder;
}

.links > * {
  line-height: 2;
  padding-bottom: 20px;
}

.link {
  cursor: pointer;
}

.link:hover {
  color: var(--theme-light);
}

.links ul:nth-of-type(-n + 2) {
  border-right: var(--border);
}

p {
  font: var(--body-copy-2);
  margin: 0;
  padding: 20px;
  text-align: center;
}

@media screen and (max-width: 600px){
  .links {
    width: 300px;
    grid-template-columns: 1fr;
  }

  .links ul:nth-of-type(-n + 2) {
    border: none;
    border-bottom: var(--border);
  }

  .logo-container > h1 {
    margin: auto;
  }
}
</style>
