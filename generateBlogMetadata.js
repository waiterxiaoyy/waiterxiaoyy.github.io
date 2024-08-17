import {
	readdirSync,
	readFileSync,
	writeFileSync,
	statSync,
} from "fs";
import path from "path";
import matter from "gray-matter";

console.log(
	"Generating blog metadata..."
);

// 获取当前模块的路径
// mac
const __dirname = path.dirname(
	new URL(import.meta.url).pathname
);
// windows
// const __dirname = path.dirname(new URL(import.meta.url).pathname).slice(1);

// 博客目录
const blogDirectory = path.join(
	__dirname,
	"public",
	"blog"
);

// 递归读取目录下的所有文件
const getAllFiles = (
	dirPath,
	arrayOfFiles
) => {
	const files = readdirSync(dirPath);

	arrayOfFiles = arrayOfFiles || [];

	files.forEach(file => {
		const fullPath = path.join(
			dirPath,
			file
		);
		if (
			statSync(fullPath).isDirectory()
		) {
			arrayOfFiles = getAllFiles(
				fullPath,
				arrayOfFiles
			);
		} else if (file.endsWith(".md")) {
			arrayOfFiles.push(fullPath);
		}
	});

	return arrayOfFiles;
};

// 获取所有 Markdown 文件
const mdFiles = getAllFiles(
	blogDirectory
);

try {
	// 存储所有博客的元数据
	const blogMetadata = mdFiles.map(
		(file, index) => {
			const content = readFileSync(
				file,
				"utf8"
			);
			const {
				data,
				content: markdownContent,
			} = matter(content);
			return {
				id: index + 1,
				title:
					data.title || "Default Title",
				author: data.author || "",
				avatar: data.avatar || "",
				category:
					data.category || "other",
				tags: data.tags || [],
				date:
					data.date ||
					new Date().toISOString(),
				abstract: data.abstract || "",
				fileName: path.basename(file), // 文件名
				filePath: file.replace(
					blogDirectory,
					""
				), // 相对路径,
				mdContent: markdownContent, // markdown 内容
			};
		}
	);

	// 输出到 JSON 文件
	writeFileSync(
		path.join(
			__dirname,
			"src",
			"blogMetadata.json"
		),
		JSON.stringify(
			blogMetadata,
			null,
			2
		)
	);

	console.log(
		"Blog metadata generated successfully."
	);
} catch (error) {
	console.error(
		"Error generating blog metadata:",
		error
	);
}
