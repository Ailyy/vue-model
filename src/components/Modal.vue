<template>
  <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">{{ title }}</h3>
        <button class="modal-close" @click="handleClose">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-meta">
          <span class="modal-date">{{ date }}</span>
          <span v-if="tag" class="modal-tag">{{ tag }}</span>
        </div>
        <div class="modal-content" v-html="content"></div>
      </div>
      <div class="modal-footer">
        <button class="modal-btn primary" @click="handleClose">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleOverlayClick() {
      this.handleClose()
    }
  }
}
</script>

<style lang="css" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
  min-height: 600px;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 2px solid #e3f2fd;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 12px 12px 0 0;
}

.modal-title {
  margin: 0;
  font-size: 20px;
  color: #1976d2;
  font-weight: 600;
  flex: 1;
}

.modal-close {
  background: transparent;
  border: none;
  font-size: 32px;
  color: #1976d2;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
  line-height: 1;
}

.modal-close:hover {
  background: rgba(25, 118, 210, 0.1);
  transform: rotate(90deg);
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.modal-body::-webkit-scrollbar {
  width: 6px;
}

.modal-body::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: #90caf9;
  border-radius: 3px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: #42a5f5;
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e3f2fd;
}

.modal-date {
  color: #90a4ae;
  font-size: 14px;
}

.modal-tag {
  background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.modal-content {
  color: #424242;
  font-size: 15px;
  line-height: 1.8;
  word-wrap: break-word;
}

/* 支持富文本对齐方式 */
::v-deep .modal-content * {
  text-align: inherit !important;
  box-sizing: border-box !important;
}

::v-deep .modal-content p, 
::v-deep .modal-content div, 
::v-deep .modal-content span, 
::v-deep .modal-content h1, 
::v-deep .modal-content h2, 
::v-deep .modal-content h3, 
::v-deep .modal-content h4, 
::v-deep .modal-content h5, 
::v-deep .modal-content h6 {
  text-align: inherit !important;
}

/* 支持内联样式的对齐 */
::v-deep .modal-content [style*="text-align"],
::v-deep .modal-content p[align],
::v-deep .modal-content div[align] {
  /* 直接使用CSS变量或继承，避免attr()函数的兼容性问题 */
  text-align: inherit !important;
}

/* 针对不同align属性值的样式 */
::v-deep .modal-content p[align="center"],
::v-deep .modal-content div[align="center"],
::v-deep .modal-content [style*="text-align:center"] {
  text-align: center !important;
}

::v-deep .modal-content p[align="left"],
::v-deep .modal-content div[align="left"],
::v-deep .modal-content [style*="text-align:left"] {
  text-align: left !important;
}

::v-deep .modal-content p[align="right"],
::v-deep .modal-content div[align="right"],
::v-deep .modal-content [style*="text-align:right"] {
  text-align: right !important;
}

::v-deep .modal-content p[align="justify"],
::v-deep .modal-content div[align="justify"],
::v-deep .modal-content [style*="text-align:justify"] {
  text-align: justify !important;
}

/* 明确支持各种对齐方式 */
::v-deep .modal-content .text-center, 
::v-deep .modal-content .text-center * {
  text-align: center !important;
}

::v-deep .modal-content .text-left, 
::v-deep .modal-content .text-left * {
  text-align: left !important;
}

::v-deep .modal-content .text-right, 
::v-deep .modal-content .text-right * {
  text-align: right !important;
}

::v-deep .modal-content .text-justify, 
::v-deep .modal-content .text-justify * {
  text-align: justify !important;
}

::v-deep .modal-content p {
  margin: 0 0 12px 0;
}

/* 只对左对齐的段落应用首行缩进 */
::v-deep .modal-content p:not([style*="text-align"]):not([align]):not(.text-center):not(.text-right):not(.text-justify),
::v-deep .modal-content p[style*="text-align:left"],
::v-deep .modal-content p[align="left"],
::v-deep .modal-content p.text-left {
  text-indent: 2em;
}

::v-deep .modal-content p:last-child {
  margin-bottom: 0;
}

/* 富文本样式补充 */
::v-deep .modal-content h1, 
::v-deep .modal-content h2, 
::v-deep .modal-content h3, 
::v-deep .modal-content h4, 
::v-deep .modal-content h5, 
::v-deep .modal-content h6 {
  margin: 16px 0 12px 0;
  color: #1976d2;
  font-weight: 600;
}

::v-deep .modal-content h1 {
  font-size: 24px;
}

::v-deep .modal-content h2 {
  font-size: 20px;
}

::v-deep .modal-content h3 {
  font-size: 18px;
}

::v-deep .modal-content h4 {
  font-size: 16px;
}

::v-deep .modal-content ul, 
::v-deep .modal-content ol {
  margin: 12px 0;
  padding-left: 24px;
}

::v-deep .modal-content li {
  margin: 6px 0;
  line-height: 1.6;
}

::v-deep .modal-content a {
  color: #42a5f5;
  text-decoration: none;
  transition: color 0.3s;
}

::v-deep .modal-content a:hover {
  color: #1976d2;
  text-decoration: underline;
}

::v-deep .modal-content img {
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  max-height: 600px !important;
  display: block !important;
  margin: 12px auto !important;
  object-fit: contain !important;
}

/* 覆盖富文本内联样式和属性 */
::v-deep .modal-content img[style],
::v-deep .modal-content img[width],
::v-deep .modal-content img[height] {
  width: 100% !important;
  height: auto !important;
}

/* 针对特定编辑器生成的图片样式 */
::v-deep .modal-content .rich-text img,
::v-deep .modal-content .editor img,
::v-deep .modal-content .ck-content img {
  max-width: 100% !important;
  max-height: 300px !important;
  width: auto !important;
  height: auto !important;
}

/* 确保图片容器也能正确处理 */
::v-deep .modal-content figure,
::v-deep .modal-content .image-container,
::v-deep .modal-content .img-wrapper {
  max-width: 100% !important;
  margin: 12px auto !important;
  display: block !important;
  text-align: center !important;
}

::v-deep .modal-content figure img,
::v-deep .modal-content .image-container img,
::v-deep .modal-content .img-wrapper img {
  max-width: 100% !important;
  max-height: 300px !important;
  margin: 0 auto !important;
}

::v-deep .modal-content blockquote {
  margin: 12px 0;
  padding: 10px 20px;
  border-left: 4px solid #bbdefb;
  background-color: #f5f9ff;
  color: #424242;
}

::v-deep .modal-content code {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  color: #d32f2f;
}

.modal-content pre {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 12px 0;
}

.modal-content pre code {
  background-color: transparent;
  padding: 0;
  color: #424242;
}

.modal-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}

.modal-content th, 
.modal-content td {
  border: 1px solid #e3f2fd;
  padding: 8px 12px;
  text-align: left;
}

.modal-content th {
  background-color: #e3f2fd;
  font-weight: 600;
  color: #1976d2;
}

.modal-content tr:nth-child(even) {
  background-color: #f5f9ff;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e3f2fd;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #fafafa;
  border-radius: 0 0 12px 12px;
}

.modal-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.modal-btn.primary {
  background: linear-gradient(135deg, #42a5f5 0%, #1976d2 100%);
  color: white;
}

.modal-btn.primary:hover {
  box-shadow: 0 4px 12px rgba(66, 165, 245, 0.4);
  transform: translateY(-2px);
}

.modal-btn.secondary {
  background: #e3f2fd;
  color: #1976d2;
}

.modal-btn.secondary:hover {
  background: #bbdefb;
}
</style>
