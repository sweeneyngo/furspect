import * as React from 'react';
import Layout from '../components/Layout/layout';
import {
    pageStyles,
    headingStyles,
    headingAccentStyles,
    paragraphStyles,
    codeStyles,
} from '../components/Layout/layout.module.css';

// markup
const AboutPage = () => {
    return (
        <Layout pageTitle="about">
            <h1 className={headingStyles}>
                Why did I create this?
                <br />
            </h1>
            <h1>
                There is serious debate from curious individuals of where
                something or someone can be placed in the anthromorphic
                spectrum. Could a character with cat ears be considered
                &quot;anthromorphic&quot;, or more bluntly, furry? Or is this
                solely a cosmetic issue that doesn&apos;t convey anything akin
                to what anthromorphism usually entails. This project tries to
                answer this question, combined with the general consensus of the
                furry fandom and with my own personal opinion added to the mix.{' '}
                <br></br>
                <br></br>To accomplish this, I considered the usage of a binary
                classification model, which applies a convolution neural network
                to deduce whether something is &quot;furry&quot; or
                &quot;nonfurry&quot;. I utilized various image collecting
                scripts and repositories from several talented individuals.
                Notably, I utilized simple_image_download for pre-model testing,
                thanks to @Roy6801 for his support on multithreading.
                Additionally, I was able to mass-collect thousands of furry
                images from the e621 image archiving website using @McSib&apos;s
                e621_downloader.
                <br></br>
                <br></br> Tensorflow has a function called
                tf.keras.preprocessing.image.ImageDataGenerator(), which
                generates augmented objects for our learning model. Its
                functions include flow_from_directory(), which is what
                we&apos;ll use to funnel our images to the function. One
                problem: it can only really recognize a certain directory
                structure. Ideally: So the following lines will help sort
                through those, with the key points in mind: We want our dataset
                to be randomly divided by a given ratio (generally, 1:5) for
                training and testing. The directories dictate the class in which
                we&apos;ll be sorting the images, not the image file itself.
                Extra directories in the /test/ and /train/ directory will
                impede on the model (it will show up as an extra class).
                <br></br>
                <br />
                **What are convolutional neural networks?** &gt; In general,
                convolution + pooling is a common process for image processing
                (and most do so iteratively for optimal results). Simply,
                convolution is to **find** useful things (or features) + pooling
                **collects** these useful things for learning. - Images are
                converted to pixels - A convolutional window (i.e. 3x3)
                simplifies what it finds down to a single value, and the window
                shifts over in an iterative loop. - Convolutions create a map,
                and pooling (common: max pooling, finds max value in
                convolutions) sifts through this convolution map. - Initial
                layers of a convolutional window find edges, lines, strong
                details (accentuate what it finds) - As you go deeper, you find
                slight curvatures, finer details, shapes, complex structures,
                scales (diving into deeper details) - Deeper details (bias,
                padding, edge detection) can be discussed on further
                practicuums.
                <br />
                **Develop a Baseline CNN Model** A baseline model: A minimum
                model performance to which all of our other models can be
                compared + a model architecture for study and improvement.
                Model: General architectural principles of the VGG models. For
                more details on the VGG model, see the 2015 paper “Very Deep
                Convolutional Networks for Large-Scale Image Recognition.” -
                Involves **stacking convolutional layers** with small 3×3
                filters followed by a max pooling layer. - Together, these
                layers form a block, and these blocks can be repeated where the
                number of filters in each block is increased with the depth of
                the network such as 32, 64, 128, 256 for the first four blocks
                of the model. - Padding is used on the convolutional layers to
                ensure the height and width shapes of the output feature maps
                matches the inputs. - We can explore this architecture on the
                dogs vs cats problem and compare a model with this architecture
                with 1, 2, and 3 blocks. Each layer will use the ReLU activation
                function and the He weight initialization, which are generally
                best practices.
                <br />
                <br />
                [**Relu Activation
                Function**](https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/)
                The rectified linear activation function or ReLU for short is a
                piecewise linear function that will output the input directly if
                it is positive, otherwise, it will output zero. The rectified
                linear activation function overcomes the vanishing gradient
                problem, allowing models to learn faster and perform better. The
                ReLU function is **f(x)=max(0,x).** One way ReLUs improve neural
                networks is by speeding up training. The gradient computation is
                very simple (either 0 or 1 depending on the sign of x). Also,
                the computational step of a ReLU is easy: any negative elements
                are set to 0.0 -- no exponentials, no multiplication or division
                operations.
                <br />
                **Weight initialization** The nodes in neural networks are made
                of parameters (weights) &gt; calculate a weighted sum of the
                inputs. Neural network models are fit using an optimization
                algorithm called stochastic gradient descent (SGD) that
                incrementally changes the weights to minimize a loss function,
                hopefully resulting in an optimal set of weights. Weight
                initialization is a procedure to set the weights of a neural
                network to small random values that define the starting point
                for the optimization (learning or training) of the neural
                network model. The current standard approach for initialization
                of the weights of neural network layers and nodes that use the
                rectified linear (ReLU) activation function is called “he”
                initialization. The **he initialization method** is calculated
                as a random number with a Gaussian probability distribution (G)
                with a mean of 0.0 and a standard deviation of sqrt(2/n), where
                n is the number of inputs to the node. ``` # convolutional layer
                block # Conv2D(filter, (window_size), activation,
                kernel_initialization, padding, input_shape(image, 3[rgb]))
                model.add(Conv2D(32, (3, 3), activation=&apos;relu&apos;,
                kernel_initializer=&apos;he_uniform&apos;,
                padding=&apos;same&apos;, input_shape=(200, 200, 3))) #
                MaxPooling2D(2, 2) model.add(MaxPooling2D((2, 2))) ``` Model:
                &apos;&apos;sequential&apos;&apos;
                _________________________________________________________________
                Layer (type) Output Shape Param #
                =================================================================
                conv2d (Conv2D) (None, 200, 200, 32) 896
                _________________________________________________________________
                batch_normalization (BatchNo (None, 200, 200, 32) 128
                _________________________________________________________________
                max_pooling2d (MaxPooling2D) (None, 100, 100, 32) 0
                _________________________________________________________________
                dropout (Dropout) (None, 100, 100, 32) 0
                _________________________________________________________________
                conv2d_1 (Conv2D) (None, 100, 100, 64) 18496
                _________________________________________________________________
                batch_normalization_1 (Batch (None, 100, 100, 64) 256
                _________________________________________________________________
                max_pooling2d_1 (MaxPooling2 (None, 50, 50, 64) 0
                _________________________________________________________________
                dropout_1 (Dropout) (None, 50, 50, 64) 0
                _________________________________________________________________
                flatten (Flatten) (None, 160000) 0
                _________________________________________________________________
                dense (Dense) (None, 256) 40960256
                _________________________________________________________________
                dropout_2 (Dropout) (None, 256) 0
                _________________________________________________________________
                dense_1 (Dense) (None, 1) 257
                =================================================================
                Total params: 40,980,289 Trainable params: 40,980,097
                Non-trainable params: 192 Add cross entropy loss picture
            </h1>
        </Layout>
    );
};

export default AboutPage;
