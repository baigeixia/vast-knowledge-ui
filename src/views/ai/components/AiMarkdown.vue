<template>
    <div class="html-highlight markdown-body" v-html="htmltext"></div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { marked } from 'marked';
import { safeHtml } from '@/utils/domPurifyConfig'
import 'github-markdown-css';

const htmltext = ref(null)

onMounted(() => {
//     const markdownContent = `
// 以下是一个简单的 Java 程序，用于输出 "Hello, World!"：

// \`\`\`java
// public class HelloWorld {
//     public static void main(String[] args) {
//         System.out.println("Hello, World!"); System.out.println("Hello, World!"); System.out.println("Hello, World!"); System.out.println("Hello, World!"); System.out.println("Hello, World!"); System.out.println("Hello, World!"); System.out.println("Hello, World!"); System.out.println("Hello, World!"); System.out.println("Hello, World!"); System.out.println("Hello, World!");
//     }
// }
// \`\`\`

// ### 代码说明：
// 1. **\`public class HelloWorld\`**：定义了一个公共类，类名是 \`HelloWorld\`。在 Java 中，类是一个基本的代码组织单元，文件名需要与公共类的类名保持一致（这里文件名应该是 \`HelloWorld.java\`）。
// 2. **\`public static void main(String[] args)\`**：这是 Java 程序的入口点。每个可执行的 Java 程序都必须有一个 \`main\` 方法，JVM（Java虚拟机）在运行程序时会从这个方法开始执行代码。
// 3. **\`System.out.println("Hello, World!");System.out.println("Hello, World!");System.out.println("Hello, World!");\`**：这是一条输出语句。

// 要运行这个程序，你可以按照以下步骤操作：
// 1. 将上述代码保存为 \`HelloWorld.java\` 文件。
// 2. 打开命令行终端，进入保存该文件的目录。
// 3. 使用 \`javac HelloWorld.java\` 命令编译代码。
// 4. 使用 \`java HelloWorld\` 命令运行程序。
// `;

    const markdownContent = `# 🔥 Typewriter 实例方法-事件 \n 😄 使你的打字器可高度定制化。\n - 更方便的控制打字器的状态 \n - 列表项 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n // 🙉 控制台可以查看相关打日志\n console.log('Hello, world!');console.log('Hello, world!');console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); \n \`\`\``
    const html = marked.parse(markdownContent);
    // DOMPurify.sanitize(html)
    htmltext.value = safeHtml(html)

    loadHighlightJS()

})

const loadHighlightJS = async () => {
    const module = await import('highlight.js');
    const hljs = module.default; // hljs 的实际引用
    // import('highlight.js/styles/a11y-light.css');
    await  import('highlight.js/styles/a11y-light.css');
    // import('highlight.js/styles/github.css'); // 延迟加载样式

    hljs.highlightAll(); // 执行高亮
};

</script>

<style lang="scss" scoped>
@import "@/assets/styles/highlight.scss";

</style>
