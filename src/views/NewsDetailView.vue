<template>
  <div class="content">
    <NavBar @menu-change="handleMenuChange" />
    <div class="main-container">
      <div class="detail-header">
        <h1 class="detail-title">{{ newsDetail.title }}</h1>
        <div class="detail-meta">
          <span class="detail-date">{{ newsDetail.date }}</span>
          <span class="detail-tag" v-if="newsDetail.tag">{{ newsDetail.tag }}</span>
        </div>
      </div>
      <div class="detail-content" v-html="newsDetail.content">
      </div>
      <div class="detail-footer">
        <button class="back-button" @click="handleBackClick">返回列表</button>
        <button style="margin-left: 2%;" class="back-button" @click="handleBackClick">下载文件</button>
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
  name: 'NewsDetailView',
  components: {
    NavBar
  },
  data() {
    return {
      newsDetail: {
        id: '',
        title: '',
        date: '',
        tag: '',
        content: ''
      },
      newsList: []
    }
  },
  mounted() {
    this.loadNewsData().then(() => {
      this.getNewsDetail()
    })
  },
  methods: {
    async loadNewsData() {
      try {
        const response = await fetch('/config.json')
        const config = await response.json()
        const baseUrl = config.LOCAL_HOST
        
        const newsResponse = await fetch(`${baseUrl}/app/news/list`)
        const newsData = await newsResponse.json()
        if (newsData.code === 200 && newsData.rows) {
          this.newsList = newsData.rows
            .filter(item => item.status === "1")
            .map(item => ({
              id: item.id,
              date: this.formatDate(item.date),
              title: item.title,
              tag: item.tag,
              content: item.content
            }))
        }
      } catch (error) {
        console.error('获取新闻数据失败:', error)
        this.setDefaultNews()
      }
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
    getNewsDetail() {
      const id = this.$route.params.id
      const newsItem = this.newsList.find(item => item.id == id)
      if (newsItem) {
        this.newsDetail = newsItem
      } else {
        // 如果找不到对应ID的新闻，显示第一条
        if (this.newsList.length > 0) {
          this.newsDetail = this.newsList[0]
        }
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
    handleMenuChange(menuItem) {
      console.log('菜单切换:', menuItem)
    },
    handleBackClick() {
      this.$router.push('/news')
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
  overflow: auto;
}

.detail-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e3f2fd;
}

.detail-title {
  color: #1976d2;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 15px 0;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.detail-date {
  color: #90a4ae;
  font-size: 14px;
}

.detail-tag {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.detail-content {
  color: #000;
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 40px;
  background-color: transparent !important;
}

/* 支持富文本对齐方式和透明背景 */
::v-deep .detail-content * {
  text-align: inherit !important;
  box-sizing: border-box !important;
  background-color: transparent !important;
}

::v-deep .detail-content p, 
::v-deep .detail-content div, 
::v-deep .detail-content span, 
::v-deep .detail-content h1, 
::v-deep .detail-content h2, 
::v-deep .detail-content h3, 
::v-deep .detail-content h4, 
::v-deep .detail-content h5, 
::v-deep .detail-content h6 {
  text-align: inherit !important;
}

/* 支持内联样式的对齐 */
::v-deep .detail-content [style*="text-align"],
::v-deep .detail-content p[align],
::v-deep .detail-content div[align] {
  /* 直接使用CSS变量或继承，避免attr()函数的兼容性问题 */
  text-align: inherit !important;
}

/* 针对不同align属性值的样式 */
::v-deep .detail-content p[align="center"],
::v-deep .detail-content div[align="center"],
::v-deep .detail-content [style*="text-align:center"] {
  text-align: center !important;
}

::v-deep .detail-content p[align="left"],
::v-deep .detail-content div[align="left"],
::v-deep .detail-content [style*="text-align:left"] {
  text-align: left !important;
}

::v-deep .detail-content p[align="right"],
::v-deep .detail-content div[align="right"],
::v-deep .detail-content [style*="text-align:right"] {
  text-align: right !important;
}

::v-deep .detail-content p[align="justify"],
::v-deep .detail-content div[align="justify"],
::v-deep .detail-content [style*="text-align:justify"] {
  text-align: justify !important;
}

/* 明确支持各种对齐方式 */
::v-deep .detail-content .text-center, 
::v-deep .detail-content .text-center * {
  text-align: center !important;
}

::v-deep .detail-content .text-left, 
::v-deep .detail-content .text-left * {
  text-align: left !important;
}

::v-deep .detail-content .text-right, 
::v-deep .detail-content .text-right * {
  text-align: right !important;
}

::v-deep .detail-content .text-justify, 
::v-deep .detail-content .text-justify * {
  text-align: justify !important;
}

::v-deep .detail-content p {
  margin: 0 0 12px 0;
}

/* 只对左对齐的段落应用首行缩进 */
::v-deep .detail-content p:not([style*="text-align"]):not([align]):not(.text-center):not(.text-right):not(.text-justify),
::v-deep .detail-content p[style*="text-align:left"],
::v-deep .detail-content p[align="left"],
::v-deep .detail-content p.text-left {
  text-indent: 2em;
}

::v-deep .detail-content p:last-child {
  margin-bottom: 0;
}

/* 富文本样式补充 */
::v-deep .detail-content h1, 
::v-deep .detail-content h2, 
::v-deep .detail-content h3, 
::v-deep .detail-content h4, 
::v-deep .detail-content h5, 
::v-deep .detail-content h6 {
  margin: 16px 0 12px 0;
  color: #1976d2;
  font-weight: 600;
}

::v-deep .detail-content h1 {
  font-size: 24px;
}

::v-deep .detail-content h2 {
  font-size: 20px;
}

::v-deep .detail-content h3 {
  font-size: 18px;
}

::v-deep .detail-content h4 {
  font-size: 16px;
}

::v-deep .detail-content ul, 
::v-deep .detail-content ol {
  margin: 12px 0;
  padding-left: 24px;
}

::v-deep .detail-content li {
  margin: 6px 0;
  line-height: 1.6;
}

::v-deep .detail-content a {
  color: #42a5f5;
  text-decoration: none;
  transition: color 0.3s;
}

::v-deep .detail-content a:hover {
  color: #1976d2;
  text-decoration: underline;
}

::v-deep .detail-content img {
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  max-height: 600px !important;
  display: block !important;
  margin: 12px auto !important;
  object-fit: contain !important;
}

/* 覆盖富文本内联样式和属性 */
::v-deep .detail-content img[style],
::v-deep .detail-content img[width],
::v-deep .detail-content img[height] {
  width: 100% !important;
  height: auto !important;
}

/* 针对特定编辑器生成的图片样式 */
::v-deep .detail-content .rich-text img,
::v-deep .detail-content .editor img,
::v-deep .detail-content .ck-content img {
  max-width: 100% !important;
  max-height: 300px !important;
  width: auto !important;
  height: auto !important;
}

/* 确保图片容器也能正确处理 */
::v-deep .detail-content figure,
::v-deep .detail-content .image-container,
::v-deep .detail-content .img-wrapper {
  max-width: 100% !important;
  margin: 12px auto !important;
  display: block !important;
  text-align: center !important;
}

::v-deep .detail-content figure img,
::v-deep .detail-content .image-container img,
::v-deep .detail-content .img-wrapper img {
  max-width: 100% !important;
  max-height: 300px !important;
  margin: 0 auto !important;
}

::v-deep .detail-content blockquote {
  margin: 12px 0;
  padding: 10px 20px;
  border-left: 4px solid #bbdefb;
  background-color: #f5f9ff;
  color: #424242;
}

::v-deep .detail-content code {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  color: #d32f2f;
}

.detail-content pre {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 12px 0;
}

.detail-content pre code {
  background-color: transparent;
  padding: 0;
  color: #424242;
}

.detail-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}

.detail-content th, 
.detail-content td {
  border: 1px solid #e3f2fd;
  padding: 8px 12px;
  text-align: left;
}

.detail-content th {
  background-color: #e3f2fd;
  font-weight: 600;
  color: #1976d2;
}

.detail-content tr:nth-child(even) {
  background-color: #f5f9ff;
}

.detail-footer {
  margin-top: 40px;
  text-align: center;
}

.back-button {
  background-color: #42a5f5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.back-button:hover {
  background-color: #1976d2;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-family: Arial;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .main-container {
    padding: 15px;
  }

  .detail-title {
    font-size: 24px;
  }

  .detail-content {
    font-size: 14px;
  }
}
</style>