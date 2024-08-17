import type { BytemdPlugin } from 'bytemd';
import matter from 'gray-matter';
import { VFile } from 'vfile'; // Ensure you have the vfile package installed
export default function frontMatterPlugin(): BytemdPlugin {
  return {
    remark: (processor) => {
      return processor.use(() => (tree: any, file: VFile) => {
        const fisrtNode = tree.children[0];
        // Ensure that file.content is a string
        const content = fisrtNode.value;
        console.log('content', content);
        // Parse front matter and markdown content
        const { data, content: markdownContent } = matter(content);
        
        console.log('data', data);
        console.log('markdownContent', markdownContent);
        // Merge     the front matter data into file.data
        file.data = { ...file.data, frontmatter: data };
        
        // Update the file contents with the parsed markdown content
        // file.frontmatter = markdownContent;
      });
    },
  };
}