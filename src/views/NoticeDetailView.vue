<template>
  <div class="content">
    <NavBar @menu-change="handleMenuChange" />
    <div class="main-container">
      <div class="detail-header">
        <h1 class="detail-title">{{ noticeDetail.title }}</h1>
        <div class="detail-meta">
          <span class="detail-date">{{ noticeDetail.date }}</span>
          <span class="detail-tag" v-if="noticeDetail.tag">{{ noticeDetail.tag }}</span>
        </div>
      </div>
      <div class="detail-content" v-html="noticeDetail.content">
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
  name: 'NoticeDetailView',
  components: {
    NavBar
  },
  data() {
    return {
      noticeDetail: {
        title: '',
        date: '',
        tag: '',
        content: ''
      },
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
      ]
    }
  },
  mounted() {
    this.getNoticeDetail()
  },
  methods: {
    getNoticeDetail() {
      const id = this.$route.params.id
      const noticeItem = this.noticeList.find(item => item.id == id)
      if (noticeItem) {
        this.noticeDetail = noticeItem
      } else {
        // 如果找不到对应ID的公告，显示第一条
        if (this.noticeList.length > 0) {
          this.noticeDetail = this.noticeList[0]
        }
      }
    },
    handleMenuChange(menuItem) {
      console.log('菜单切换:', menuItem)
    },
    handleBackClick() {
      this.$router.push('/notice')
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
  color: #424242;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 40px;
  white-space: pre-wrap;
  background-color: transparent !important;
}

/* 支持富文本对齐方式和透明背景 */
::v-deep .detail-content * {
  text-align: inherit !important;
  box-sizing: border-box !important;
  background-color: transparent !important;
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