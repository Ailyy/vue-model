<template>
  <div class="content">
    <NavBar @menu-change="handleMenuChange" />
    <div class="main-container">
      <Carousel />
      <div class="content-grid">
        <ContentSection title="公司新闻" :items="newsList" @item-click="handleNewsClick" @more-click="handleNewsMoreClick" />
        <ContentSection title="公司公告" :items="noticeList" @item-click="handleNoticeClick" @more-click="handleNoticeMoreClick" />
        <ContentSection title="体系文件" :items="documentList" @item-click="handleDocumentClick" @more-click="handleDocumentMoreClick" />
      </div>
    </div>
    <div class="el-login-footer">
        <span>Copyright © 2023-{{new Date().getFullYear()}} 武汉海德博创科技有限公司.</span>
    </div>
    <Modal
      :visible="modalVisible"
      :title="modalData.title"
      :date="modalData.date"
      :tag="modalData.tag"
      :content="modalData.content"
      @close="handleModalClose"
    />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Carousel from '@/components/Carousel.vue'
import ContentSection from '@/components/ContentSection.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    Carousel,
    ContentSection,
    Modal
  },
  data() {
    return {
      modalVisible: false,
      modalData: {
        title: '',
        date: '',
        tag: '',
        content: ''
      },
      baseUrl: '',
      newsList: [],
      noticeList: [
        { 
          id: 1,
          date: '2024-01-20', 
          title: '关于春节放假安排的通知', 
          tag: '重要',
          content: '根据国家法定节假日安排，结合公司实际情况，现将2024年春节放假安排通知如下：\n\n放假时间：2024年2月9日至2月17日，共9天\n\n复工时间：2024年2月18日（星期日）\n\n请各部门提前做好工作安排，确保节后工作正常开展。祝全体员工春节快乐！'
        },
        { 
          id: 2,
          date: '2024-01-18', 
          title: '关于开展年度考核工作的通知',
          content: '为全面客观评价员工年度工作表现，公司决定开展2023年度考核工作。\n\n考核时间：2024年2月1日至2月15日\n\n考核内容：工作业绩、工作能力、工作态度等\n\n请各部门认真组织，确保考核工作公平公正。'
        },
        { 
          id: 3,
          date: '2024-01-15', 
          title: '关于规范办公用品领用的通知',
          content: '为加强办公用品管理，节约成本，提高使用效率，现对办公用品领用作如下规定：\n\n1. 实行按需领用，避免浪费\n2. 领用需填写领用单，经部门负责人审批\n3. 贵重物品需经分管领导审批\n4. 定期进行盘点，确保账实相符\n\n请各部门严格遵守。'
        },
        { 
          id: 4,
          date: '2024-01-12', 
          title: '关于举办消防演练的通知', 
          tag: '紧急',
          content: '为提高全体员工的消防安全意识和应急处理能力，公司定于2024年1月20日下午14:00举办消防演练。\n\n演练地点：公司总部大楼\n\n演练内容：火灾报警、疏散逃生、灭火器使用等\n\n请全体员工准时参加，不得缺席。'
        },
        { 
          id: 5,
          date: '2024-01-10', 
          title: '关于更新员工手册的通知',
          content: '根据公司发展需要和相关政策变化，公司对员工手册进行了修订更新。\n\n新版员工手册已上传至公司内网，请全体员工及时下载学习。\n\n如有疑问，请咨询人力资源部。'
        },
        { 
          id: 6,
          date: '2024-01-08', 
          title: '关于开展业务培训的通知',
          content: '为提升员工业务能力，公司将于2024年1月15日至1月19日开展业务培训。\n\n培训对象：全体业务人员\n\n培训内容：产品知识、销售技巧、客户服务等\n\n请各部门合理安排工作，确保参训率。'
        }
      ],
      documentList: [
        { 
          id: 1,
          date: '2024-01-20', 
          title: '公司管理制度汇编（2024版）', 
          tag: '制度',
          content: '公司管理制度汇编（2024版）已正式发布，涵盖以下内容：\n\n一、组织管理制度\n二、人力资源管理制度\n三、财务管理制度\n四、行政管理制度\n五、业务管理制度\n六、质量管理制度\n七、安全管理制度\n\n请各部门组织学习，严格执行。'
        },
        { 
          id: 2,
          date: '2024-01-18', 
          title: '质量管理体系文件',
          content: '质量管理体系文件包括：\n\n1. 质量手册\n2. 程序文件\n3. 作业指导书\n4. 质量记录\n\n所有文件均已更新，请相关部门遵照执行。'
        },
        { 
          id: 3,
          date: '2024-01-15', 
          title: '安全生产管理制度', 
          tag: '安全',
          content: '安全生产管理制度主要内容包括：\n\n一、安全生产责任制\n二、安全教育培训制度\n三、安全检查制度\n四、事故报告和处理制度\n五、应急预案管理制度\n\n各部门必须严格执行，确保安全生产。'
        },
        { 
          id: 4,
          date: '2024-01-12', 
          title: '员工行为规范手册',
          content: '员工行为规范手册规定了员工在工作中的行为准则，包括：\n\n一、职业道德规范\n二、工作纪律规范\n三、仪容仪表规范\n四、沟通礼仪规范\n五、保密规范\n\n请全体员工认真学习，自觉遵守。'
        },
        { 
          id: 5,
          date: '2024-01-10', 
          title: '财务管理制度',
          content: '财务管理制度包括：\n\n一、预算管理制度\n二、费用报销制度\n三、资金管理制度\n四、固定资产管理制度\n五、财务报告制度\n\n各部门必须严格遵守财务制度，规范财务管理。'
        },
        { 
          id: 6,
          date: '2024-01-08', 
          title: '人力资源管理制度',
          content: '人力资源管理制度涵盖：\n\n一、招聘管理制度\n二、培训管理制度\n三、绩效考核制度\n四、薪酬福利制度\n五、员工关系管理制度\n\n请人力资源部认真执行，其他部门积极配合。'
        }
      ]
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
            .map((item, index) => ({
              id: item.id || index + 1,
              date: this.formatDate(item.date),
              title: item.title,
              tag: item.tag,
              content: this.formatNewsContent(item.content)
            }))
        }
        console.log(this.newsList)
      } catch (error) {
        console.error('获取公司新闻失败:', error)
        this.setDefaultNews()
      }
    },
    formatDate(dateString) {
      // 格式化日期为YYYY-MM-DD格式
      if (!dateString) return ''
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    formatNewsContent(content) {
      // 富文本内容直接返回，由v-html渲染
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
      this.$router.push(`/news/${item.id}`)
    },
    handleNoticeClick(item) {
      this.$router.push(`/notice/${item.id}`)
    },
    handleDocumentClick(item) {
      this.$router.push(`/document/${item.id}`)
    },
    handleModalClose() {
      this.modalVisible = false
    },
    handleNewsMoreClick() {
      this.$router.push('/news')
    },
    handleNoticeMoreClick() {
      this.$router.push('/notice')
    },
    handleDocumentMoreClick() {
      this.$router.push('/document')
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
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  height: 330px;
}

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .main-container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .main-container {
    padding: 10px;
  }

  .content-grid {
    gap: 15px;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #666;
  font-family: Arial;
  font-size: 1.2rem;
  letter-spacing: 1px;
}
</style>
