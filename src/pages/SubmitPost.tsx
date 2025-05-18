import { useState, useEffect } from "react";

import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  UndoRedo,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  codeBlockPlugin,
  tablePlugin,
  InsertCodeBlock,
  InsertThematicBreak,
  thematicBreakPlugin,
  imagePlugin,
} from "@mdxeditor/editor";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

// Função simples para gerar uma chave única
function generateKey() {
  return Math.random().toString(36).substr(2, 9);
}

const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const SANITY_DATASET = "production";
const SANITY_API_TOKEN = import.meta.env.VITE_SANITY_CREATOR_API_TOKEN;

type Author = {
  _id: string;
  name: string;
};

export default function SubmitPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar autores do Sanity
  useEffect(() => {
    fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${SANITY_DATASET}?query=*[_type=="author"]{_id,name}`
    )
      .then((res) => res.json())
      .then((data) => setAuthors(data.result || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const doc: any = {
      _type: "post",
      title,
      body: [
        {
          _type: "block",
          _key: generateKey(),
          children: [
            {
              _type: "span",
              _key: generateKey(),
              text: body,
            },
          ],
        },
      ],
      publishedAt: new Date().toISOString(),
      author: { _type: "reference", _ref: author },
    };

    try {
      const res = await fetch(
        `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${SANITY_DATASET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SANITY_API_TOKEN}`,
          },
          body: JSON.stringify({ mutations: [{ create: doc }] }),
        }
      );
      const data = await res.json();

      if (res.ok && data.results && !data.error) {
        setSuccess(true);
        setTitle("");
        setBody("");
        setAuthor("");
        setError(null);
      } else if (data.error) {
        setError(data.error.description || "Failed to submit post.");
      } else {
        setError("Failed to submit post.");
      }
    } catch (err: any) {
      setError(
        err?.message || (err?.description as string) || "Error submitting post."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxWidth={600}
      mx="auto"
      my={6}
      p={4}
      bgcolor="background.paper"
      borderRadius={3}
      boxShadow={3}
    >
      <Typography variant="h4" fontWeight="bold" mb={3} align="center">
        Submit a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            placeholder="Enter the post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel id="author-label">Author</InputLabel>
            <Select
              labelId="author-label"
              id="author"
              value={author}
              label="Author"
              onChange={(e) => setAuthor(e.target.value)}
            >
              <MenuItem value="">
                <em>Select author</em>
              </MenuItem>
              {authors.map((a) => (
                <MenuItem key={a._id} value={a._id}>
                  {a.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography component="label" htmlFor="body-editor" fontWeight="bold">
            Body{" "}
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
            >
              (Markdown supported)
            </Typography>
          </Typography>
          <MDXEditor
            markdown={body}
            onChange={setBody}
            placeholder="Write your post in Markdown..."
            className="mdxeditor"
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              linkPlugin(),
              imagePlugin(),
              codeBlockPlugin(),
              tablePlugin(),
              thematicBreakPlugin(),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <BlockTypeSelect />
                    <BoldItalicUnderlineToggles />
                    <ListsToggle />
                    <CreateLink />
                    <InsertImage />
                    <InsertTable />
                    <InsertCodeBlock />
                    <InsertThematicBreak />
                  </>
                ),
              }),
            ]}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            size="large"
            sx={{ fontWeight: "bold" }}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {success && (
            <Alert severity="success" sx={{ textAlign: "center" }}>
              Post submitted!
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ textAlign: "center" }}>
              {error}
            </Alert>
          )}
        </Box>
      </form>
    </Box>
  );
}
