<template>
    <article class="html-highlight  markdown-body" v-html="htmltext"></article>
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
 const markdownContent = `
 以下是一个简单的使用Java编写的Hello World程序：

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### 代码说明：
1. **\`public class HelloWorld\`**：定义了一个公共的类，类名是\`HelloWorld\`。在Java中，类是代码的基本组织单元，一个Java源文件中最多只能有一个\`public\`类，并且该类的名称必须与源文件的名称相同（包括大小写）。
2. **\`public static void main(String[] args)\`**：这是Java程序的入口点。\`public\`表示该方法具有公共访问权限；\`static\`意味着它属于类本身，而不是类的实例，可以直接通过类名调用；\`void\`表示该方法不返回任何值；\`main\`是方法名，Java虚拟机在运行程序时会寻找这个特定的方法作为程序执行的起点；\`String[] args\`是一个字符串数组，用于接收命令行参数。
3. **\`System.out.println("Hello, World!");\`**：这行代码使用\`System.out\`（标准输出流）的\`println\`方法在控制台打印出\`Hello, World!\`字符串，并在打印后换行。

你可以将上述代码保存为一个名为\`HelloWorld.java\`的文件，然后按照以下步骤编译和运行：
1. **编译**：打开命令行终端，进入保存\`HelloWorld.java\`文件的目录，然后执行\`javac HelloWorld.java\`命令，这会生成一个名为\`HelloWorld.class\`的字节码文件。
2. **运行**：在命令行中执行\`java HelloWorld\`命令，即可看到控制台输出\`Hello, World!\`。 
`;

    // const markdownContent = `# 🔥 Typewriter 实例方法-事件 \n 😄 使你的打字器可高度定制化。\n - 更方便的控制打字器的状态 \n - 列表项 **粗体文本** 和 *斜体文本* \n \`\`\`javascript \n // 🙉 控制台可以查看相关打日志\n console.log('Hello, world!');console.log('Hello, world!');console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); console.log('Hello, world!'); \n \`\`\``
    const html = marked.parse(markdownContent);
    // DOMPurify.sanitize(html)
    htmltext.value = safeHtml(html)

    loadHighlightJS()

})

const loadHighlightJS = async () => {
    const module = await import('highlight.js');
    const hljs = module.default; // hljs 的实际引用
    // import('highlight.js/styles/a11y-light.css');
    await import('highlight.js/styles/a11y-light.css');
    // import('highlight.js/styles/github.css'); // 延迟加载样式

    hljs.highlightAll(); // 执行高亮
};

</script>

<style lang="scss" scoped>
@import "@/assets/styles/highlight.scss";
</style>
