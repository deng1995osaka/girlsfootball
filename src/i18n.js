import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        about: "Our Story",
        features: "What's Inside",
        intro: "Let's Kick Off!",
        download: "Get the App"
      },
      // Main Page
      main: {
        title: "Play. Make Friends. Have Fun.",
        subtitle: {
          line1: "Whether it's a 5-a-side or a street match,",
          line2: "We just want to run, score, and shout our hearts out on the field."
        }
      },
      // Features
      features: {
        team: {
          title: "Who's Playing Nearby?",
          subtitle: "TEAM STATUS >>>",
          highlights: [
            "Discover local games based on your area",
            "Create your own team profile",
            "Design your pixel-style team kit"
          ]
        },
        moments: {
          title: "Your Football Diary",
          subtitle: "MEMORY LOADING >>>",
          highlights: [
            "Capture your favorite moments",
            "Share your training days",
            "Post your stories from the pitch"
          ]
        },
        player: {
          title: "You, as a Player",
          subtitle: "PLAYER CARD >>>",
          highlights: [
            "Personalize your Player Card",
            "Pick your position on the field",
            "Keep track of your updates and teams"
          ]
        }
      },
      // Story Page
      story: {
        star: "★ Girls Who Play ★",
        suffix: "The Story",
        title: "★ Girls Who Play ★",
        title_en: "The Story of ★女孩踢球★",
        subheadline: {
          line1: "Don't ask if we can play,",
          line2: "Just watch us take the field."
        },
        content: [
          "In spring 2022, I joined a local women's football team as a total beginner.",
          "The girls taught me how to pass and shoot—we played together, ate together, hiked, and watched games.",
          "One weekend, we even flew kites in the park.",
          "Before long, I realized teams like ours were everywhere."
        ],
        invitation: {
          line1: "If you're already part of this world, share your football life.",
          line2: "If you're looking for teammates—this is where you'll find them."
        }
      },
      // Ending
      ending: "★女孩踢球★ — Let's kick off, together.",
      // Video Page
      video: {
        title: "Girls Who Play"
      },
      // Image Alt Texts
      alt: {
        nokia: "Nokia SMS UI",
        team: "TEAM Feature Preview",
        moments: "MOMENTS Feature Preview",
        player: "PLAYER Feature Preview"
      },
      header: {
        title: "★女孩踢球★",
        title_en: "★女孩踢球★"
      },
      coming_soon: "Coming Soon",
      ios_coming_soon: "Our app is coming soon to the App Store！",
      dock: {
        video: { content: "INTRO", prefix: "", en: "开球!" },
        promo: { content: "THE STORY OF", prefix: "女孩踢球", en: "女孩踢球" },
        features: { content: "FEATURES", prefix: "", en: "踢球·交朋友·一起玩" },
        download: { content: "DOWNLOAD", prefix: "", en: "我们球场见" }
      }
    }
  },
  zh: {
    translation: {
      // Navigation
      nav: {
        about: "关于我们",
        features: "功能特点",
        intro: "开始体验",
        download: "下载应用"
      },
      // Main Page
      main: {
        title: "踢球·交朋友·一起玩",
        subtitle: {
          line1: "无论是五人制还是街头比赛",
          line2: "我们只想在球场上奔跑、进球、尽情呐喊"
        }
      },
      // Features
      features: {
        team: {
          title: "谁在附近踢球？",
          subtitle: "TEAM STATUS >>>",
          highlights: [
            "按区域筛选，看看谁在附近踢球",
            "创建你的球队档案",
            "设计你的像素风格队服"
          ]
        },
        moments: {
          title: "你的足球日记",
          subtitle: "MEMORY LOADING >>>",
          highlights: [
            "记录精彩瞬间",
            "分享训练日常",
            "发布你的球场故事"
          ]
        },
        player: {
          title: "作为球员的你",
          subtitle: "PLAYER CARD >>>",
          highlights: [
            "定制专属 PLAYER 卡片",
            "选择你的场上位置",
            "查看你的小报和球队"
          ]
        }
      },
      // Story Page
      story: {
        star: "★女孩踢球★",
        suffix: "的故事",
        title: "★女孩踢球★的故事",
        title_en: "The Story of ★女孩踢球★",
        subheadline: {
          line1: "别问能不能踢，",
          line2: "先上场再说。"
        },
        content: [
          "2022年春天，我作为初学者加入了一支业余女足队。",
          "女孩们教我传球、射门，我们一起踢球，也一起聚餐、爬山、看球赛。",
          "甚至在一个周末，一起去公园放风筝。",
          "后来，我发现像我们这样的队伍越来越多。"
        ],
        invitation: {
          line1: "如果你也是其中一员，欢迎分享你的足球生活；",
          line2: "如果你在找她们，现在可以和她们一起踢了。"
        }
      },
      // Ending
      ending: "★女孩踢球★ 等你来开球！",
      // Video Page
      video: {
        title: "女孩踢球"
      },
      // Image Alt Texts
      alt: {
        nokia: "诺基亚短信界面",
        team: "球队功能预览",
        moments: "动态功能预览",
        player: "球员功能预览"
      },
      header: {
        title: "★女孩踢球★",
        title_en: "★女孩踢球★"
      },
      coming_soon: "移动端应用即将上线",
      ios_coming_soon: "移动端应用即将上线",
      dock: {
        video: { content: "开球!", prefix: "", en: "INTRO" },
        promo: { content: "的故事", prefix: "女孩踢球", en: "ABOUT" },
        features: { content: "踢球·交朋友·一起玩", prefix: "", en: "FEATURES" },
        download: { content: "我们球场见", prefix: "", en: "DOWNLOAD" }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // 默认语言
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 