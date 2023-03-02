import {
  Button,
  Chip,
  Divider,
  Grid,
  Hidden,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Article } from "./Article";
import RichTextEditor from "./RichTextEditor";
import { useSnackbar } from "notistack";
import UserFunctions from "../user/UserFunctions";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ArticleView from "./ArticleView";
import { ArticlePublic } from "./ArticlePublic";

function WritePage() {
  const [isLoadedArticle, setIsLoadedArticle] = useState(false);
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);
  const [isLoadErrorArticle, setIsLoadErrorArticle] = useState(false);
  const [articleContent, setArticleContent] = useState("");
  const [articleTopic, setArticleTopic] = useState("");
  const [createdArticleId, setCreatedArticleId] = useState<string | null>(null);

  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleClose = () => {
    setBackdropOpen(false);
  };
  const handleToggle = () => {
    setBackdropOpen(!backdropOpen);
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const emptyArticle: Article = {
    id: null,
    createdBy: UserFunctions.getUser()?.id ?? null,
    modifiedBy: UserFunctions.getUser()?.id ?? null,
    created: new Date(),
    modified: new Date(),
    name: "",
    description: "",
    content: "",
    tags: [],
    imageUrlHeader: "",
    imageUrlThumbnail: "",
    isDeleted: false,
  };

  const [article, setArticle] = useState<Article>(emptyArticle);

  let { id } = useParams();

  useEffect(() => {
    document.title = "Write";

    if (!isLoadingArticle && id !== undefined) {
      setIsLoadingArticle(true);

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UserFunctions.getUserToken()}`,
        },
      };

      enqueueSnackbar("Retreiving your article", { variant: "info" });

      fetch(
        process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
          "/content/blog/article/" +
          id,
        requestOptions
      )
        .then((response) => {
          if (!response.ok) throw Error();
          setIsLoadingArticle(false);
          setIsLoadErrorArticle(false);
          setIsLoadedArticle(true);
          return response.json();
        })
        .then((json) => {
          setArticle(json);
          setArticleContent(json.content);
          enqueueSnackbar("Article Retrieved", { variant: "success" });
          setActiveStep(1);
        })
        .catch((error) => {
          setIsLoadingArticle(false);
          setIsLoadedArticle(false);
          setIsLoadErrorArticle(true);
        });
    }
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    var articleToPost = article;
    articleToPost.content = articleContent;

    if (articleToPost.imageUrlHeader === "")
      articleToPost.imageUrlHeader = null;

    if (articleToPost.imageUrlThumbnail === "")
      articleToPost.imageUrlThumbnail = null;

    articleToPost.tags = article.tags
      ?.toString()
      .replaceAll(", ", ",")
      .split(",");

    if (articleToPost.tags?.length === 1 && articleToPost.tags[0] === "")
      articleToPost.tags = null;

    saveToDatabse(articleToPost);
  };

  function saveToDatabse(article: Article) {
    const requestOptions = {
      method: id === undefined ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
      body: JSON.stringify(article),
    };

    enqueueSnackbar("Saving", { variant: "info" });

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/content/blog/article" +
        (id === undefined ? "" : "/" + id),
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();

        enqueueSnackbar("Saved", { variant: "success" });
        setArticle(emptyArticle);
        setArticleContent("");
        response.text().then((text) => setCreatedArticleId(text));
      })
      .catch((error) => {
        enqueueSnackbar("Failed", { variant: "error" });
      });
  }

  const handleCreateWithArtificialIntelligenceSubmit = (event: any) => {
    event.preventDefault();
    setBackdropOpen(!backdropOpen);
    getArticleCreatedWithArtificialIntelligence(articleTopic);
  };

  function getArticleCreatedWithArtificialIntelligence(articleTopic: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${UserFunctions.getUserToken()}`,
      },
    };

    enqueueSnackbar("Creating article", { variant: "info" });

    fetch(
      process.env.REACT_APP_WHATEVER_IT_IS_API_CONNECTION_STRING +
        "/content/blog/article/artificial-intelligence/" +
        articleTopic,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) throw Error();

        enqueueSnackbar("Ready to view", { variant: "success" });

        return response.json();
      })
      .then((json) => {
        setArticle(json);
        setArticleContent(json.content);
        setBackdropOpen(false);
        setActiveStep(1);
      })
      .catch((error) => {
        enqueueSnackbar("Failed", { variant: "error" });
        setBackdropOpen(false);
      });
  }

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 3;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    if (id === undefined) {
      setCreatedArticleId(null);
      setArticle(emptyArticle);
      setArticleContent("");
      setArticleTopic("");
      setActiveStep(0);
    } else setActiveStep(1);
  };

  const steps = ["Creation Style", "Article", "Details", "Images", "Review"];

  interface NavigationBottons {
    readyToContinue: boolean;
  }

  function NavigationButtons({ readyToContinue }: NavigationBottons) {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          variant="contained"
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isStepOptional(activeStep) && (
          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
            Skip
          </Button>
        )}
        <Button
          onClick={activeStep === steps.length ? handleReset : handleNext}
          variant="contained"
          disabled={!readyToContinue}
        >
          {activeStep === steps.length
            ? "Reset"
            : activeStep === steps.length - 1
            ? "Finish"
            : "Next"}
        </Button>
      </Box>
    );
  }
  return (
    <div>
      {UserFunctions.getUser() ? (
        <>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <div>
              <>
                {!createdArticleId && (
                  <>
                    {article.name?.length === 0 ||
                    article.description?.length === 0 ||
                    articleContent.length < 11 ? (
                      <div>
                        <Typography>
                          These errors are preventing you from publishing your
                          article
                        </Typography>
                        {article.name?.length === 0 ? (
                          <Typography color="red">Name is empty</Typography>
                        ) : article.description?.length === 0 ? (
                          <Typography color="red">
                            Description is empty
                          </Typography>
                        ) : articleContent.length < 11 ? (
                          <Typography color="red">Content is empty</Typography>
                        ) : article.imageUrlHeader?.length === 0 ? (
                          <Typography>Image header is empty</Typography>
                        ) : article.imageUrlThumbnail?.length === 0 ? (
                          <Typography>Image Thumbnail is empty</Typography>
                        ) : article.tags?.length === 0 ? (
                          <Typography>Tags are empty</Typography>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <Typography variant="h3" align="center">
                        If all looks Good to you, click publish to make your
                        article public
                      </Typography>
                    )}
                  </>
                )}
              </>

              {!isLoadingArticle && (
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  disabled={
                    article.name?.length === 0 ||
                    article.description?.length === 0 ||
                    articleContent.length <= 11
                  }
                  onClick={handleSubmit}
                >
                  {id === undefined ? "Publish" : "Update"}
                </Button>
              )}

              {createdArticleId && (
                <a
                  href={"/article/" + createdArticleId}
                  title="View your new article"
                  target="_blank"
                >
                  View your published article
                </a>
              )}
              <NavigationButtons
                readyToContinue={
                  createdArticleId !== null && createdArticleId.length > 0
                }
              />
            </div>
          ) : activeStep === 0 ? (
            <>
              <Hidden smDown={true}>
                <Grid container>
                  <Grid item xs>
                    <Typography variant="h4" align="center">
                      Old Fashion Way
                    </Typography>
                    <Typography variant="h6">
                      Using your mind create a title, description, and article.
                      Then type it all out yourself.
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem>
                    <Typography variant="h4" align="center">
                      OR
                    </Typography>
                  </Divider>
                  <Grid item xs>
                    <Typography variant="h4" align="center">
                      Artificial Intelligence
                    </Typography>
                    <Typography variant="h6">
                      Simply specify your topic, such as "Dogs from Germany" or
                      "The impact of dairy milk on the body".
                    </Typography>
                    <Typography variant="h6">
                      Your article will take about 30 seconds to generate.
                      Reloading the page will lose your progress.
                    </Typography>
                    <TextField
                      name="Topic"
                      label="Topic"
                      type="text"
                      value={articleTopic}
                      onChange={(e) => setArticleTopic(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={handleCreateWithArtificialIntelligenceSubmit}
                      disabled={
                        articleTopic.length === 0 ||
                        article.name?.length !== 0 ||
                        article.description?.length !== 0
                      }
                    >
                      Generate
                    </Button>
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden smUp={true}>
                <Typography variant="h4" align="center">
                  Old Fashion Way
                </Typography>
                <Typography variant="h6">
                  Using your mind create a title, description, and article. Then
                  type it all out yourself.
                </Typography>
                <Divider>
                  <Typography variant="h4" align="center">
                    OR
                  </Typography>
                </Divider>
                <Typography variant="h4" align="center">
                  Artificial Intelligence
                </Typography>
                <Typography variant="h6">
                  Simply specify your topic, such as "Dogs from Germany" or "The
                  impact of dairy milk on the body".
                </Typography>
                <Typography variant="h6">
                  Your article will take about 30 seconds to generate. Reloading
                  the page will lose your progress.
                </Typography>
                <TextField
                  name="Topic"
                  label="Topic"
                  type="text"
                  value={articleTopic}
                  onChange={(e) => setArticleTopic(e.target.value)}
                />
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleCreateWithArtificialIntelligenceSubmit}
                  disabled={
                    articleTopic.length === 0 ||
                    article.name?.length !== 0 ||
                    article.description?.length !== 0
                  }
                >
                  Generate
                </Button>
              </Hidden>
              <NavigationButtons readyToContinue={true} />
            </>
          ) : activeStep === 1 ? (
            <>
              <RichTextEditor
                content={articleContent}
                setContent={setArticleContent}
              />
              <NavigationButtons readyToContinue={articleContent.length > 11} />
            </>
          ) : activeStep === 2 ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <TextField
                    id="name-input"
                    name="name"
                    label="Name"
                    type="text"
                    value={article.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="description-input"
                    name="description"
                    label="Description"
                    type="text"
                    value={article.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    id="tags-input"
                    name="tags"
                    label="Tags (sepearated with a ',')"
                    type="text"
                    value={article.tags}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <br />
                  <br />
                  {article.tags === undefined || article.tags?.length === 0
                    ? "Preview of tags: "
                    : article.tags
                        ?.toString()
                        .split(",")
                        .map((tag: string, key) => (
                          <Chip
                            label={tag}
                            sx={{ marginRight: 1 }}
                            key={key}
                            style={{
                              marginLeft: 2,
                              marginRight: 2,
                              marginBottom: 4,
                            }}
                          />
                        ))}
                </Grid>
              </Grid>
              <NavigationButtons
                readyToContinue={
                  article.name !== null &&
                  article.name.length > 0 &&
                  article.description !== null &&
                  article.description.length > 0
                }
              />
            </>
          ) : activeStep === 3 ? (
            <>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={12}>
                      <TextField
                        id="imageUrlThumbnail-input"
                        name="imageUrlThumbnail"
                        label="Thumbnail Image URL"
                        type="text"
                        value={article.imageUrlThumbnail}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <img
                        src={article.imageUrlThumbnail?.toString()}
                        alt={"Photo preview will appear here"}
                        loading="lazy"
                        width={"100%"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={12}>
                      <TextField
                        id="imageUrlHeader-input"
                        name="imageUrlHeader"
                        label="Header Image URL"
                        type="text"
                        value={article.imageUrlHeader}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <img
                        src={article.imageUrlHeader?.toString()}
                        alt={"Photo preview will appear here"}
                        loading="lazy"
                        width={"100%"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <NavigationButtons readyToContinue={true} />
            </>
          ) : (
            <div>
              <Typography variant="h3" align="center">
                Before continuing, review your article
              </Typography>
              <ArticleView
                article={{
                  id: "",
                  name: article.name,
                  description: article.description,
                  content: articleContent,
                  created: new Date(),
                  createdBy: UserFunctions.getUser()?.id ?? "",
                  modified: new Date(),
                  modifiedBy: UserFunctions.getUser()?.id ?? "",
                  approvalRating: 100,
                  creatorName: UserFunctions.getUser()?.name ?? "No name given",
                  creatorProfileImageUrl:
                    UserFunctions.getUser()?.profileImageUrl ??
                    "No profile photo given",
                  imageUrlHeader: article.imageUrlHeader,
                  imageUrlThumbnail: article.imageUrlThumbnail,
                  isDeleted: false,
                  likes: 0,
                  dislikes: 0,
                  isLiked: null,
                  isDisliked: null,
                  views: 0,
                  tags:
                    article.tags?.length === 1 && article.tags[0] === ""
                      ? null
                      : article.tags
                          ?.toString()
                          .replaceAll(", ", ",")
                          .split(","),
                }}
                failedToLoad={null}
                isEditMode={false}
                listMode={false}
                articlePageMode={true}
                showCreatorDetails={true}
                key={1}
              />
              <NavigationButtons readyToContinue={true} />
            </div>
          )}
        </>
      ) : (
        "You must be logged in to write an article"
      )}
      <Backdrop
        open={backdropOpen}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default WritePage;
