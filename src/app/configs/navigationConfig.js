import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from 'src/app/auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Main',
    subtitle: '',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'Main',
    children: [
      {
        id: 'dashboards.overiew',
        title: 'Overview',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/overview',
        auth : authRoles.admin,
      }
    ],
  },
];
export default navigationConfig;
