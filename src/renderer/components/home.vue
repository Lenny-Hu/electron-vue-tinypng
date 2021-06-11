<template>
  <div class="p-home">
    <a-layout>
      <a-layout-header class="hd">
        <div class="hd-logo">TinyPng</div>
        <div class="hd-act">
          <a-button class="hd-act-btn" type="primary" shape="circle" icon="folder-add" />
          <a-button class="hd-act-btn" type="primary" @click="showDrawer" shape="circle" icon="setting" />
          <a-button class="hd-act-btn" type="primary" icon="caret-right">
            开 始
          </a-button>
        </div>
      </a-layout-header>
      <a-layout-content class="bd">
        <div class="bd-inner">
          
        </div>
      </a-layout-content>

      <a-drawer
        width="50%"
        title="设置"
        placement="right"
        :closable="false"
        :visible="visible.drawer"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
        class="home-drawer"
      >
        <a-space class="home-drawer-inner" direction="vertical" size="large">
          <a-card title="缩放">
            <a-switch  slot="extra" v-model="setting.enable" />
            <a-form-model :model="form" :label-col="labelCol" :rules="rules" :wrapper-col="wrapperCol">
              <a-form-model-item label="方式">
                <a-select v-model="form.method" placeholder="请选择缩放方式">
                  <a-select-option :value="ite.k" v-for="(ite, i) in resizeMethod" :key="i" :title="ite.desc">
                    {{ite.title}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="宽度">
                <a-input v-model="form.width" placeholder="请输入宽度"/>
              </a-form-model-item>
              <a-form-model-item label="高度">
                <a-input v-model="form.height" placeholder="请输入高度"/>
              </a-form-model-item>
              <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
                <a-button type="primary" @click="onSubmit">
                  保 存
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </a-card>

          <a-card title="密钥">
            <a-input v-model="setting.key" placeholder="请输入密钥(必填)" @input="saveKey"/>
          </a-card>
        </a-space>
      </a-drawer>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        visible: {
          drawer: false
        },
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        form: {
          width: '',
          height: '',
          method: ''
        },
        resizeMethod: [
          {
            title: 'scale',
            k: 'scale',
            desc: '按比例缩小图片。您必须提供目标width或height，不能同时提供两者。缩小后的图片会有确定的宽度或者高度。'
          },
          {
            title: 'fit',
            k: 'fit',
            desc: '按比例缩小图片，使其适合（fit）给定的尺寸。你必须同时提供width和height。缩小后的图像不会超过这些尺寸中的任何一个。'
          },
          {
            title: 'cover',
            k: 'cover',
            desc: '按比例缩小图片，如有必要裁切图片。结果具有准确的给定尺寸。 图片中哪个部分将被裁切是自动决定的。智能算法确定图像中最重要的区域。'
          },
          {
            title: 'thumb',
            k: 'thumb',
            desc: '一个更先进的缩略图实现，还能检测具有简单背景的裁切图片。图片会被缩小到您提供的width和height的大小。 如果一个图片被检测到独立物体，算法将在必要位置添加更多的背景，或者裁切掉不重要的部分。'
          }
        ],
        rules: {
          width: [
            { required: true, message: '请输入宽度', trigger: 'blur' },
            { min: 1, max: 9999, message: '输入的值应在1-9999之间', trigger: 'blur' }
          ],
          height: [
            { required: true, message: '请输入高度', trigger: 'blur' },
            { min: 1, max: 9999, message: '输入的值应在1-9999之间', trigger: 'blur' }
          ]
        },
        setting: {
          enable: false,
          key: localStorage.getItem('key') || ''
        }
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      afterVisibleChange (val) {
        console.log('visible', val)
      },
      showDrawer () {
        this.visible.drawer = true
      },
      onClose () {
        this.visible.drawer = false
      },
      onSubmit () {
        console.log('submit!', this.form)
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      saveKey () {
        localStorage.setItem('key', this.setting.key)
      }
    }
  }
</script>

<style lang="scss">
  .p-home {
    height: 100%;

    .ant {
      &-layout {
        height: 100%;

        &-header {
          display: flex;
        }

        &-content {
          padding: 20px 20px;
        }
      }
    }

    .hd {
      &-logo {
        flex: none;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }

      &-act {
        flex: none;
        margin-left: auto;

        &-btn {
          margin: 0 5px;
        }
      }
    }

    .bd {
      display: flex;
      flex-direction: column;

      &-inner {
        flex: 1;
        background-color: #fff;
      }
    }
  }

  .home-drawer {
    &-inner {
      width: 100%;
    }
  }
</style>
