<template>
  <div class="content">
    <NavBar @menu-change="handleMenuChange" />
    <div class="main-container">
      <h1 class="page-title">公司新闻</h1>
      <div class="news-list">
        <div v-for="(item, index) in newsList" :key="index" class="news-item" @click="handleNewsClick(item)">
          <div class="news-item-header">
            <span class="news-date">{{ item.date }}</span>
            <span class="news-tag" v-if="item.tag">{{ item.tag }}</span>
          </div>
          <h3 class="news-title">{{ item.title }}</h3>
          <!-- <div class="news-content" v-if="item.content">
            {{ item.content.length > 100 ? item.content.substring(0, 100) + '...' : item.content }}
          </div> -->
        </div>
      </div>
    </div>
    <div class="el-login-footer">
        <span>Copyright © 2023-{{new Date().getFullYear()}} 武汉海德博创科技有限公司.</span>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'NewsView',
  components: {
    NavBar
  },
  data() {
    return {
      baseUrl: '',
      newsList: []
    }
  },
  mounted() {
    this.loadConfig().then(() => {
      this.fetchNewsList()
    })
  },
  methods: {
    async loadConfig() {
      try {
        const response = await fetch('/config.json')
        const config = await response.json()
        this.baseUrl = config.LOCAL_HOST
      } catch (error) {
        console.error('加载配置文件失败:', error)
        this.baseUrl = ''
      }
    },
    async fetchNewsList() {
      try {
        const response = await fetch(`${this.baseUrl}/app/news/list`)
        const data = await response.json()
        if (data.code === 200 && data.rows) {
          this.newsList = data.rows
            .filter(item => item.status === "1")
            .map(item => ({
              id: item.id,
              date: this.formatDate(item.date),
              title: item.title,
              tag: item.tag,
              content: this.formatNewsContent(item.content)
            }))
        }
      } catch (error) {
        console.error('获取公司新闻失败:', error)
        this.setDefaultNews()
      }
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    formatNewsContent(content) {
      return content || ''
    },
    setDefaultNews() {
      this.newsList = [
        {
          id: 1,
          date: '2024-01-20',
          title: '公司2024年度工作会议圆满召开',
          tag: '重要',
          content: '2024年1月20日，公司2024年度工作会议在总部会议室隆重召开。会议全面总结了2023年度工作成果，深入分析了当前面临的机遇与挑战，并对2024年度重点工作进行了部署。\n\n会议指出，过去一年，在全体员工的共同努力下，公司各项业务取得了显著成绩，市场份额稳步提升，技术创新成果丰硕，客户满意度持续提高。\n\n会议强调，2024年公司将继续坚持创新驱动发展战略，加大研发投入，优化产品结构，提升服务质量，力争实现新的突破。'
        },
        {
          id: 2,
          date: '2024-01-18',
          title: '关于开展安全生产月活动的通知',
          tag: '通知',
          content: '为深入贯彻"安全第一、预防为主、综合治理"的方针，进一步提高全体员工的安全意识和安全技能，公司决定于2024年2月开展安全生产月活动。\n\n活动主题：强化安全意识，筑牢安全防线\n\n活动内容：\n1. 安全知识培训\n2. 应急演练\n3. 安全隐患排查\n4. 安全知识竞赛\n\n请各部门高度重视，认真组织，确保活动取得实效。'
        },
        {
          id: 3,
          date: '2024-01-15',
          title: '公司荣获行业创新奖',
          tag: '荣誉',
          content: '在刚刚结束的2023年度行业创新评选活动中，我公司凭借"智能数据分析平台"项目荣获行业创新奖。\n\n该奖项是对公司技术创新能力的充分肯定，也是对公司全体研发人员辛勤付出的认可。公司将继续加大研发投入，推动技术创新，为客户提供更优质的产品和服务。'
        },
        {
          id: 4,
          date: '2024-01-12',
          title: '新员工入职培训圆满结束',
          content: '为期一周的新员工入职培训于2024年1月12日圆满结束。本次培训共有30名新员工参加，培训内容涵盖公司文化、规章制度、业务知识、技能培训等多个方面。\n\n通过培训，新员工对公司有了更全面的了解，为尽快融入团队、胜任工作岗位奠定了良好基础。'
        },
        {
          id: 5,
          date: '2024-01-10',
          title: '关于调整作息时间的通知',
          tag: '通知',
          content: '为提高工作效率，保障员工身心健康，经公司研究决定，自2024年2月1日起调整作息时间：\n\n上午：9:00-12:00\n下午：13:30-18:00\n\n请各部门合理安排工作，确保各项工作正常开展。'
        },
        {
          id: 6,
          date: '2024-01-08',
          title: '公司举办年度技术交流会',
          content: '2024年1月8日，公司年度技术交流会在总部会议室成功举办。本次交流会邀请了行业专家、技术骨干共同探讨技术发展趋势，分享技术经验。\n\n会上，多位技术专家作了精彩演讲，内容涵盖人工智能、大数据、云计算等前沿技术领域。与会人员积极互动，气氛热烈，取得了良好的交流效果。'
        }
      ]
    },
    handleMenuChange(menuItem) {
      console.log('菜单切换:', menuItem)
    },
    handleNewsClick(item) {
      console.log(item)
      this.$router.push(`/news/${item.id}`)
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f5f9ff 0%, #e3f2fd 100%);
  overflow: hidden;
}

.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
  flex: 1;
  overflow-y: auto;
}

.page-title {
  color: #1976d2;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e3f2fd;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s;
}

.news-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.news-item-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.news-date {
  color: #90a4ae;
  font-size: 14px;
  margin-right: 15px;
}

.news-tag {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.news-title {
  color: #424242;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.news-content {
  color: #424242;
  font-size: 14px;
  line-height: 1.2;
  word-wrap: break-word;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-family: Arial;
  font-size: 1.2rem;
  letter-spacing: 1px;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .main-container {
    padding: 15px;
  }

  .page-title {
    font-size: 20px;
  }

  .news-item {
    padding: 15px;
  }

  .news-title {
    font-size: 16px;
  }
}
</style>